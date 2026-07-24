import { NextResponse } from "next/server";
import { z } from "zod";
import { sendDevnetProof } from "@/lib/solana-server";
const schema = z.object({ event: z.string().min(3).max(64).regex(/^[a-z0-9-]+$/) });
export async function POST(request: Request) { const parsed = schema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "A safe event identifier is required." }, { status: 400 }); try { const proof = await sendDevnetProof(parsed.data.event); return NextResponse.json({ verified: true, network: "devnet", event: parsed.data.event, ...proof }); } catch (error) { return NextResponse.json({ verified: false, error: error instanceof Error ? error.message : "Devnet proof failed." }, { status: 502 }); } }