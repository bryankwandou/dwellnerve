# DwellNerve MVP Completion — July 24, 2026

## Workflow matrix

| Workflow | User action | Real verification | Status |
|---|---|---|---|
| AI portfolio agent | Generate live operations brief | Groq `llama-3.3-70b-versatile` returns structured priorities | Live |
| Emergency maintenance | Submit gas-smell report | Deterministic emergency rule, Groq classification, synchronous devnet acknowledgement | Live |
| General devnet proof | Verify an operational event | Server signer confirms Solana Memo Program transaction | Live |
| Connected-wallet proof | Connect Phantom/Solflare-compatible wallet and sign | Browser signs locally; app broadcasts and confirms against devnet RPC | Live |
| Tenant payment proof | Connect wallet and approve `0.0001 SOL` | Server verifies successful System Program transfer, exact recipient, and minimum amount | Live |
| Invalid payment rejection | Submit memo/wrong recipient/low amount | Verification endpoint rejects evidence that is not a qualifying transfer | Live |
| Compliance scan | Run scheduled scan | Returns three unique flags and proves idempotency | Live |
| Compliance resolution | Resolve a flag | Card leaves only after a confirmed devnet receipt | Live |
| Late-fee calculation | Request fee calculation | Lease grace period and jurisdiction cap rules execute server-side | Live |
| Responsive product UI | Open management and tenant routes | Production build renders all routes; mobile breakpoints included | Live |

## Rotated devnet operator

The original shared emergency key was abandoned after its balance unexpectedly dropped. DwellNerve now uses a dedicated production secret stored only in local ignored environment storage and Vercel project environment storage.

- Public key: `BmUmpwcDXaxF1cSBKUowwpie1uTTYXVRptwjGdjQdj8L`
- Funding transaction: `4AMM3DMy1SD65MNES7ELwQD4awAaj32MFy9ikcfZ6K3QLJfxfK88whkxcecNdwffsawrVPBqAQqTvPPAFFb9d53f`
- Funded balance observed: `0.100945 SOL`

## Acceptance evidence

- Tests: `5/5` passed.
- TypeScript: passed.
- Focused ESLint: passed.
- Next.js production build: passed with `17` routes.
- Real emergency acknowledgement: `2UYZzSPVLSJzbcYVuzbPm2R8WvQiYb6QdxQEMkj5fvpAgvm79pLXWofYb56TyqrZRazEBuManTJ9C44ed9JG4Bf2`.
- Real payment transfer accepted by verifier: `61pNZNNAiJXd5u8RirUXm5Hm4WxGKgJNK2ig9eMeZTTYtte12xczUSWkbdgStF88NnEYckr5y9KYPRQPcfRS9XEA` at slot `478490508`.
- Memo-only evidence was rejected by the payment verifier.

## Scope boundary

The devnet MVP workflow is complete. It intentionally does not charge real-world rent. Production fiat/card collection still requires a merchant-owned Stripe account and regulatory onboarding; durable multi-user tenancy requires a hosted Supabase project using the included schema and RLS policies.