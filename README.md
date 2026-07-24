# DwellNerve

DwellNerve is an early-warning operating system for rental portfolios: maintenance triage, lease-governed rent, scheduled compliance signals, tenant self-service, and optional Solana devnet evidence.

## Run

```bash
npm install
npm run dev
```

The demo works without credentials. Add `GROQ_API_KEY` for model-assisted triage; deterministic emergency rules remain active.

## Verify

```bash
npm run test
npm run type-check
npm run lint
npm run build
```

Production database and RLS groundwork is in `supabase/migrations`.
## Live deployment

- App: `https://dwellnerve.vercel.app`
- Repository: `https://github.com/bryankwandou/dwellnerve`
- Verification evidence: `docs/verification.md`