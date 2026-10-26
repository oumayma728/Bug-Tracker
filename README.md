# BugWatch

Bug tracking platform with role management, status tracking and full action history.

**Live demo:** https://bug-tracker-kappa-weld.vercel.app

<!-- TODO: add a screenshot: ![BugWatch](docs/screenshot.png) -->

## Features
- Role-based access (JWT authentication with Passport)
- Bug lifecycle and status tracking
- Action history on every bug
- CI with GitHub Actions

## Stack
Next.js (client) · NestJS (server) · TypeScript · Jest

## Run locally
    cd server && npm install && npm run start:dev
    cd client && npm install && npm run dev

Tests: `npm test` in each folder.
