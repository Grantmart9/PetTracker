# Dog Boundary Tracker

A full-stack web application that helps dog owners track their pets' locations in real-time and set custom boundaries to receive notifications when dogs leave designated areas.

## Features

- **User Authentication**: Sign up, login, and password reset via Supabase Auth
- **Dog Profiles**: Add and manage multiple dogs with photos and details
- **Real-time Location Tracking**: GPS coordinates from dog collars/devices
- **Boundary Management**: Draw custom geo-fences on interactive maps
- **Notifications**: Email and push notifications when dogs exit boundaries
- **Live Maps**: View dog positions and movement history with Leaflet maps

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **Backend**: Node.js, Next.js API Routes
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Maps**: Leaflet with React-Leaflet
- **Real-time**: Supabase Realtime
- **Hosting**: Vercel + Supabase

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd dog-boundary-tracker
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

4. Set up Supabase:

   - Create a new Supabase project
   - Enable Authentication (auth.users table is created automatically)
   - Run the migration: `supabase/migrations/0001_initial_schema.sql`
   - Optional: Run the seed data after creating users: `supabase/seed.sql`
     (Note: Seed data requires actual user IDs from auth.users table)

5. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

### Tables

- `users`: User profiles (extends Supabase auth.users)
- `dogs`: Dog information and profiles
- `locations`: GPS coordinates with timestamps
- `boundaries`: GeoJSON boundary definitions
- `notifications`: Alert history and status

## API Endpoints

- `POST /api/location/update`: Update dog location
- `GET /api/dog/[id]/locations`: Get dog's location history
- `POST /api/boundary/check`: Check if location is within boundaries
- `POST /api/notifications/send`: Send notifications

## Deployment

### Vercel + Supabase

1. Connect your repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy to production

### Supabase Edge Functions (Optional)

For server-side location processing, deploy the location update logic as Supabase Edge Functions.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
