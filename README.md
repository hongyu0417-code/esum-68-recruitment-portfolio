# ESUM 68 Executive Recruitment

A recruitment and information site for the Engineering Society of Universiti Malaya (ESUM), presenting the society, departments, events, team structure, tenure highlights, and recruitment journey.

**Live demo:** [esum-68-executive-recruitment.vercel.app](https://esum-68-executive-recruitment.vercel.app/)

## What it includes

- ESUM overview, department descriptions, and recruitment information
- Recruitment timeline and tenure highlights
- Department and leadership pages
- Application and staff-screening flows
- Responsive layouts and motion-enhanced interactions

## Tech stack

- Next.js 16, React 19, and TypeScript
- Vite with Vinext
- Tailwind CSS 4 and custom CSS
- Drizzle ORM
- Cloudflare D1 (`DB`) and R2 (`FILES`) bindings for application data and uploaded files

## Run locally

Requires Node.js 22.13 or later and npm.

```bash
npm install
npm run dev
```

Use `npm run build` for a production build. Application-data features need separately configured D1 and R2 bindings. The private production API endpoint can be supplied through `ESUM_API_UPSTREAM_URL`; it is deliberately not included here. Never commit real credentials, local database files, or applicant records.

## Portfolio snapshot notes

This public copy omits individual and event photographs, direct personal contact numbers, local databases, private hosting metadata, and the production admin/API URLs. Those changes apply only to this portfolio repository; they do not change the live demo or the original local source folder.
