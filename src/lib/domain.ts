export type Urgency = "low" | "medium" | "high" | "emergency";
export type Trade = "plumbing" | "electrical" | "hvac" | "appliance" | "general" | "safety";
export interface TriageResult { urgency: Urgency; trade: Trade; reason: string; requiresImmediateNotification: boolean }
export interface LeaseTerms { monthlyRent: number; dueDay: number; gracePeriodDays: number; lateFeeType: "flat" | "percent"; lateFeeValue: number; jurisdictionCap: number }
export interface ComplianceLease { id: string; tenant: string; balance: number; daysPastGrace: number; insuranceExpiresOn?: string; leaseEndsOn: string }
export interface ComplianceFlag { leaseId: string; type: "unpaid_rent" | "insurance_expired" | "lease_expiring"; severity: "watch" | "action" | "urgent" }
const emergencyTerms = ["gas smell", "fire", "sparking", "carbon monoxide", "flooding", "burst pipe", "no heat", "break-in"];
export function triageMaintenance(description: string): TriageResult {
  const text = description.toLowerCase();
  const trade: Trade = text.match(/gas|fire|smoke|carbon monoxide|break-in/) ? "safety" : text.match(/pipe|toilet|sink|water|leak|flood/) ? "plumbing" : text.match(/outlet|power|sparking|light/) ? "electrical" : text.match(/heat|ac|air condition|furnace/) ? "hvac" : text.match(/fridge|oven|dishwasher|washer|dryer/) ? "appliance" : "general";
  if (emergencyTerms.some((term) => text.includes(term))) return { urgency: "emergency", trade, reason: "Safety or major property-loss language detected.", requiresImmediateNotification: true };
  if (text.match(/leak|no hot water|power out|broken lock/)) return { urgency: "high", trade, reason: "Habitability or escalating-damage risk detected.", requiresImmediateNotification: false };
  if (text.match(/broken|not working|stuck|dripping/)) return { urgency: "medium", trade, reason: "Service-impacting issue requiring normal dispatch.", requiresImmediateNotification: false };
  return { urgency: "low", trade, reason: "No immediate safety or habitability signal detected.", requiresImmediateNotification: false };
}
export function calculateLateFee(terms: LeaseTerms, daysLate: number) {
  if (terms.lateFeeValue < 0 || terms.jurisdictionCap < 0) throw new Error("Fee values cannot be negative.");
  const fee = terms.lateFeeType === "flat" ? terms.lateFeeValue : terms.monthlyRent * terms.lateFeeValue / 100;
  if (fee > terms.jurisdictionCap) throw new Error("Configured late fee exceeds the jurisdiction cap.");
  return daysLate > terms.gracePeriodDays ? Math.round(fee * 100) / 100 : 0;
}
export function scanCompliance(leases: ComplianceLease[], existing: ComplianceFlag[], today = new Date()) {
  const next = [...existing]; const add = (flag: ComplianceFlag) => { if (!next.some((x) => x.leaseId === flag.leaseId && x.type === flag.type)) next.push(flag) };
  for (const lease of leases) {
    if (lease.balance > 0 && lease.daysPastGrace >= 5) add({ leaseId: lease.id, type: "unpaid_rent", severity: lease.daysPastGrace >= 10 ? "urgent" : "action" });
    if (lease.insuranceExpiresOn && new Date(lease.insuranceExpiresOn) < today) add({ leaseId: lease.id, type: "insurance_expired", severity: "action" });
    const daysToEnd = Math.ceil((new Date(lease.leaseEndsOn).getTime() - today.getTime()) / 86400000);
    if (daysToEnd >= 0 && daysToEnd <= 60) add({ leaseId: lease.id, type: "lease_expiring", severity: "watch" });
  } return next;
}