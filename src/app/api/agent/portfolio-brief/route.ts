import { NextResponse } from "next/server";
import Groq from "groq-sdk";
import { z } from "zod";

const schema = z.object({ focus: z.enum(["operations", "cash", "risk"]).default("operations") });
const portfolio = {
  collected: 82440,
  scheduled: 85095,
  openRepairs: 12,
  emergency: { issue: "Strong gas smell near range", waitingMinutes: 4, trade: "safety" },
  lateLease: { tenant: "Theo Grant", balance: 2185, daysPastGrace: 11 },
  compliance: ["Insurance expired for Briar 2B", "Atlas 7F renewal window is open"],
};

export async function POST(request: Request) {
  if (!process.env.GROQ_API_KEY) return NextResponse.json({ error: "GROQ_API_KEY is not configured." }, { status: 503 });
  const parsed = schema.safeParse(await request.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "Invalid agent focus." }, { status: 400 });
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: "You are DwellNerve, an operations agent for a rental portfolio. Return strict JSON with keys headline, briefing, priorities (array of exactly 3 objects with action, owner, deadline, reason), and watch. Be direct. Put safety before money. Never invent legal advice or facts outside the supplied portfolio." },
      { role: "user", content: `Focus: ${parsed.data.focus}. Current time: July 24, 2026. Portfolio JSON: ${JSON.stringify(portfolio)}` },
    ],
  });
  const content = response.choices[0]?.message?.content;
  if (!content) return NextResponse.json({ error: "The agent returned no content." }, { status: 502 });
  return NextResponse.json({ ...JSON.parse(content), provider: "groq", model: "llama-3.3-70b-versatile", generatedAt: new Date().toISOString() });
}