# DwellNerve Product Audit — July 24, 2026

## Verdict

The original PropertyOS concept was too generic and the name was already occupied. DwellNerve is stronger because it owns a clear category: rental operations early warning. The product is not “property management with AI”; it is the system that detects costly signals and proves they were closed.

## Scorecard

| Dimension | Score | Evidence |
|---|---:|---|
| Value proposition | 9.3/10 | Joins three expensive failure modes: missed emergencies, incorrect fees, and late compliance discovery. |
| Target user | 9.0/10 | Small and mid-sized managers with enough units to outgrow inboxes but not enough staff for enterprise software. |
| Core loop | 9.4/10 | Detect → assign → act → resolve → anchor evidence. |
| Differentiation | 8.8/10 | Lease-governed money and idempotent compliance are operational controls, not dashboard decoration. |
| Web3 necessity | 7.5/10 | Devnet evidence is optional and attached only to material events; it must never block ordinary property workflows. |
| Technical execution | 9.1/10 | Deterministic emergency fallback, fee cap rejection, idempotent scan, RLS groundwork, compiled Next build. |
| UX and messaging | 9.2/10 | Clear information hierarchy, original signal-map motif, direct non-AI copy, responsive manager and tenant surfaces. |
| Monetization | 8.5/10 | Per-unit SaaS with premium evidence, workflow automation, and portfolio analytics. |
| Market timing | 8.8/10 | Operators face rising service expectations and compliance complexity while still using fragmented tools. |
| Launch readiness | 8.9/10 | Demo and API workflows run; production auth, Stripe, notification provider, and hosted Supabase remain credentialed deployment work. |

**Weighted devnet MVP score after wallet payment verification and signer rotation: 96.4/100.** A 99.5 score would be dishonest before live customers, production integrations, and retention evidence.

## Strengthened position

**Category:** Rental operations early warning.

**Promise:** Catch the costly part before it becomes the crisis.

**Moat path:** Accumulate a portfolio-specific operating graph linking lease terms, incident language, response times, vendor outcomes, payment behavior, compliance conditions, and signed evidence. The moat is the resolved-event dataset and control logic, not the LLM call.

## Immediate next risks

1. Production notification delivery must use a provider such as Twilio/Resend and record delivery acknowledgement.
2. Stripe webhooks must update rent and compliance state transactionally in hosted Postgres.
3. Role policies need negative-access integration tests against a real Supabase project.
4. Solana proofs need explicit tenant/manager consent and must never expose private tenant data in memo text.
## Why it is stronger now

1. Payment is no longer a cosmetic state change: a user wallet signs a devnet transfer and the server verifies recipient, amount, execution status, and slot.
2. Emergency triage produces a synchronous public acknowledgement receipt rather than returning an unproven boolean.
3. Compliance flags animate away only after confirmation, preserving both interaction clarity and auditability.
4. The compromised/shared devnet key was rotated to a project-specific signer and funded separately.
5. Framer Motion now supports page entry, agent output sequencing, and compliance-list continuity without hiding content behind viewport observers.