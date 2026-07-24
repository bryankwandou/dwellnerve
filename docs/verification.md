# Production Verification — July 24, 2026

## Automated validation

- Domain tests: 4 passed.
- TypeScript: passed.
- Focused ESLint across app, components, libraries, and tests: passed.
- Next.js production build: passed with 15 application/API routes.

## Real AI execution

`POST /api/agent/portfolio-brief` executed against Groq and returned:

- Provider: `groq`
- Model: `llama-3.3-70b-versatile`
- Headline: `Urgent Safety Issue at Rental Property`
- Priorities returned: `3`

The deterministic emergency classifier remains authoritative for safety escalation even if the model provider is unavailable.

## Real Solana devnet execution

`POST /api/solana/proof` created and confirmed a Memo Program transaction on Solana devnet.

- Verified: `true`
- Signer: `35z7X59rtyts557Up1RAwpyYN7x2cFqcDc7RjPuNxFzr`
- Signature: `3nB8wEyehZEXuo2LyMuN9ThtuWkDNeJwx9MjTjaMAF71nWPdGw1ZiDk7i5R5Vtg5fDrtLWux3xGL9uSs4NjwW6iT`
- Balance after proof: `22.667484861 SOL`
- Observed devnet slot: `478478335`

The UI exposes two proof paths: a server-signed public operational attestation and a browser-wallet memo signed by the connected user.
## Vercel production verification

The production deployment at `https://dwellnerve.vercel.app` was verified on July 24, 2026:

- Dashboard HTTP status: `200`
- Groq provider/model: `groq` / `llama-3.3-70b-versatile`
- Agent priorities returned: `3`
- Devnet signer health: `true`
- Production signature: `TmWiaa4yNXFunw422iYbenWVipgNmjNtv35wFGQ9REx2ojzxr4QofymwnDHGcYjeNzfnsKFG5NbCWFjNg11HXYE`
- Devnet slot observed: `478481079`
## Devnet wallet-payment iteration

- Rotated signer: `BmUmpwcDXaxF1cSBKUowwpie1uTTYXVRptwjGdjQdj8L`
- Funding transaction: `4AMM3DMy1SD65MNES7ELwQD4awAaj32MFy9ikcfZ6K3QLJfxfK88whkxcecNdwffsawrVPBqAQqTvPPAFFb9d53f`
- Emergency acknowledgement: `2UYZzSPVLSJzbcYVuzbPm2R8WvQiYb6QdxQEMkj5fvpAgvm79pLXWofYb56TyqrZRazEBuManTJ9C44ed9JG4Bf2`
- Verified devnet payment: `61pNZNNAiJXd5u8RirUXm5Hm4WxGKgJNK2ig9eMeZTTYtte12xczUSWkbdgStF88NnEYckr5y9KYPRQPcfRS9XEA`
- Payment slot: `478490508`
- Negative verification: memo-only evidence rejected.