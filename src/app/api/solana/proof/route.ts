import { NextResponse } from "next/server";
import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import bs58 from "bs58";
import { z } from "zod";

const schema = z.object({ event: z.string().min(3).max(64).regex(/^[a-z0-9-]+$/) });
const memoProgram = new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr");

export async function POST(request: Request) {
  if (!process.env.SOLANA_DEVNET_SECRET_KEY) return NextResponse.json({ error: "Devnet signer is not configured." }, { status: 503 });
  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: "A safe event identifier is required." }, { status: 400 });
  try {
    const signer = Keypair.fromSecretKey(bs58.decode(process.env.SOLANA_DEVNET_SECRET_KEY));
    const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com", "confirmed");
    const latest = await connection.getLatestBlockhash("confirmed");
    const memo = JSON.stringify({ product: "DwellNerve", event: parsed.data.event, at: new Date().toISOString(), nonce: crypto.randomUUID().slice(0, 8) });
    const instruction = new TransactionInstruction({ keys: [{ pubkey: signer.publicKey, isSigner: true, isWritable: false }], programId: memoProgram, data: Buffer.from(memo) });
    const transaction = new Transaction({ feePayer: signer.publicKey, recentBlockhash: latest.blockhash }).add(instruction);
    transaction.sign(signer);
    const signature = await connection.sendRawTransaction(transaction.serialize(), { skipPreflight: false, preflightCommitment: "confirmed" });
    await connection.confirmTransaction({ signature, blockhash: latest.blockhash, lastValidBlockHeight: latest.lastValidBlockHeight }, "confirmed");
    return NextResponse.json({ verified: true, network: "devnet", event: parsed.data.event, signature, signer: signer.publicKey.toBase58(), explorer: `https://explorer.solana.com/tx/${signature}?cluster=devnet` });
  } catch (error) {
    return NextResponse.json({ verified: false, error: error instanceof Error ? error.message : "Devnet proof failed." }, { status: 502 });
  }
}