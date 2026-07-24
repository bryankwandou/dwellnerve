"use client";
import { useState } from "react";
import { Buffer } from "buffer";
import { Connection, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { ExternalLink, Fingerprint, Wallet } from "lucide-react";

declare global { interface Window { solana?: { connect: () => Promise<{ publicKey: PublicKey }>; signAndSendTransaction: (transaction: Transaction) => Promise<{ signature: string }> } } }

type Proof = { signature: string; explorer: string };
export function SolanaProofButton({ event }: { event: string }) {
  const [status, setStatus] = useState("Verify on devnet"); const [proof, setProof] = useState<Proof | null>(null); const [wallet, setWallet] = useState("Use wallet");
  async function verify() { setStatus("Sending proof..."); setProof(null); const response = await fetch("/api/solana/proof", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ event }) }); const data = await response.json(); if (!response.ok) { setStatus(data.error || "Proof failed"); return; } setProof(data); setStatus(`${data.signature.slice(0, 5)}...${data.signature.slice(-4)}`); }
  async function signWithWallet() { try { if (!window.solana) throw new Error("Install a Solana wallet"); setWallet("Connecting..."); const { publicKey } = await window.solana.connect(); const connection = new Connection(process.env.NEXT_PUBLIC_SOLANA_RPC_URL || "https://api.devnet.solana.com", "confirmed"); const latest = await connection.getLatestBlockhash(); const instruction = new TransactionInstruction({ keys: [{ pubkey: publicKey, isSigner: true, isWritable: false }], programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"), data: Buffer.from(`DwellNerve:${event}:${new Date().toISOString()}`) }); const transaction = new Transaction({ feePayer: publicKey, recentBlockhash: latest.blockhash }).add(instruction); const { signature } = await window.solana.signAndSendTransaction(transaction); await connection.confirmTransaction(signature, "confirmed"); setWallet(`${publicKey.toBase58().slice(0, 4)}... signed`); } catch (error) { setWallet(error instanceof Error ? error.message : "Wallet proof failed"); } }
  return <div className="proofActions"><button className="proofButton" onClick={verify}><Fingerprint size={16} />{status}</button><button className="proofButton walletButton" onClick={signWithWallet}><Wallet size={16} />{wallet}</button>{proof && <a className="proofLink" href={proof.explorer} target="_blank" rel="noreferrer">View confirmed transaction <ExternalLink size={13} /></a>}</div>;
}