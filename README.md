# HealthSync HMS

HealthSync HMS is a web-based healthcare management system designed to support everyday workflows for patients, doctors, and administrators.

## Features

- Role-based experiences for patients, doctors, and administrators
- Appointment management for patients and doctors
- Access to prescriptions and billing information
- Administrative tools for overseeing healthcare workflows
- Supabase authentication and data services

## Tech Stack

Frontend: React, HTML, Tailwind CSS.

Backend: Supabase,JavaScript.

Authentication: Supabase Auth.

Database: PostgreSQL (via Supabase)


## Getting Started

### Prerequisites

- Node.js and npm
- A Supabase project with the required tables and authentication settings configured

### Installation

Clone the repository and install its dependencies:

```bash
git clone https://github.com/Savage69-alt/HealthSync-HMS.git
cd HealthSync-HMS
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and provide your Supabase project details:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_or_publishable_key
```

Keep these variable names unchanged. Never put a Supabase service-role or secret key in frontend environment variables, and do not commit `.env.local` to GitHub.

### Run the Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually `http://localhost:5173`.

## Production Build

Create and preview a production build with:

```bash
npm run build
npm run preview
```

## Deployment

The project can be deployed to Vercel by importing the GitHub repository. Use `npm run build` as the build command and `dist` as the output directory. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as project environment variables, then deploy.

## Security Note

Configure Supabase Row Level Security (RLS) policies and appropriate permissions for database tables before using real patient information. The frontend anon/publishable key must only be used with suitable access policies. Never expose service-role or secret keys in the browser.

