# WanderWise - AI Trip Planner

> **Status:** Active development. Expect rapid changes while the core journey is being built.

## Overview
WanderWise is an AI-assisted travel companion built with Next.js 15 and Chakra UI. The goal is to help travellers design personalised itineraries, balance budgets, and stay on top of live updates from a single dashboard. The current milestone lays the groundwork: a marketing landing page, secure authentication powered by Appwrite, and user profile management.

While the AI itinerary engine and trip-planning workspace are still being wired, the project already demonstrates the design system, state management, and Appwrite integration that will power the final experience.

## Current Experience
- Responsive landing page with feature highlights and conversion-focused calls to action.
- Email/password and Google OAuth sign-in powered by Appwrite, with session routing and guards.
- Dashboard shell that greets the authenticated user, surfaces quick actions, and keeps place for future trip data.
- Profile editor backed by Appwrite Tables, allowing travellers to manage their personal details.
- Light/dark theming built with next-themes on top of the Chakra UI 3 component library.

## In Progress
- AI itinerary generator with budget, preference, and duration controls.
- Collaborative trip-planning workspace for saving and sharing itineraries.
- Notifications and real-time travel updates inside the dashboard.
- Expanded Appwrite schema to store trips, destinations, and saved recommendations.

## Tech Stack
- Next.js 15 (App Router) running on React 19 and TypeScript.
- Chakra UI v3 for the design system plus custom UX components.
- next-themes for persisted color mode control.
- Appwrite (Account + Tables) for authentication, profiles, and future content.
- React Icons and Lucide for iconography.

## Getting Started

### Prerequisites
- Node.js 18 or later.
- An Appwrite project (self-hosted or Appwrite Cloud) with email/password auth enabled. Google OAuth is optional but recommended.

### Installation
1. Clone this repository.
2. Install dependencies with `npm install`.

### Environment variables
Create a `.env.local` file in the project root with at least:

```
NEXT_PUBLIC_APPWRITE_ENDPOINT=<your-appwrite-endpoint>
NEXT_PUBLIC_APPWRITE_PROJECT=<your-appwrite-project-id>
```

Restart the dev server whenever you change these values.

### Appwrite configuration
- Enable Email/Password authentication and, if used, Google OAuth. Set the OAuth success and failure redirect URLs to `https://<your-domain>/Dashboard` and `https://<your-domain>/SignIn`.
- Create a `user_profiles` table in Appwrite Tables (or update the IDs referenced in the code) with string attributes for `firstName`, `lastName`, `email`, `phoneNumber`, `location`, and optional `userPictureURL`.
- Update the `DATABASE_ID` and `TABLE_ID` constants in `src/app/Dashboard/page.tsx` and `src/app/Profile/page.tsx` to match your Appwrite setup until they are externalised.

### Run the app
- Start the development server with `npm run dev`. Visit `http://localhost:3000`.
- Run `npm run build` and `npm start` to test a production build.
- Lint the project with `npm run lint`.

## Project structure

```text
.
|- public/        # Static assets (hero imagery, icons, etc.)
|- src/
|  |- app/        # Next.js App Router pages, layouts, and route handlers
|  |- components/ # UI and UX components composed with Chakra UI
|  `- lib/        # Appwrite client and shared utilities
`- README.md
```

## Development notes
- Chakra UI components are written in TypeScript using the v3 API (`@chakra-ui/react`).
- Color mode helpers live in `src/components/ui/color-mode.tsx` and wrap `next-themes`.

## Contributing
Contributions are welcome while the project is still taking shape. Please open an issue describing the change you have in mind before submitting a pull request so the roadmap can be kept in sync.

## License
This project is currently unlicensed. Reach out before using it in production or redistributing.
