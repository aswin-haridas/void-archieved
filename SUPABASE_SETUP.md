# Supabase Setup for Search History

This document explains how to set up Supabase to store search history for the Void application.

## Prerequisites

1. A Supabase account and project
2. The environment variables provided in the issue

## Database Setup

1. Log into your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL script found in `supabase_table_setup.sql`

This will create:
- `search_history` table with proper schema
- Indexes for performance
- Row Level Security policies

## Environment Variables

The following environment variables are already configured in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://ldrwlgksnbbfeokrieoe.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxkcndsZ2tzbmJiZmVva3JpZW9lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxOTczMTYsImV4cCI6MjA3Mzc3MzMxNn0.OnVI363H4anYWFeiDDDZpwutS-6_vh6gny4LtVEgjhg
```

## How it Works

1. **Hybrid Storage**: The application now uses both Supabase and localStorage
   - Primary storage: Supabase cloud database
   - Fallback: localStorage for offline/error scenarios

2. **Migration**: Existing localStorage data is automatically migrated to Supabase on first load

3. **Error Handling**: If Supabase is unavailable, the app gracefully falls back to localStorage

## Files Modified

- `lib/supabase.ts` - Supabase client configuration
- `utils/supabaseHistory.ts` - Database operations
- `hooks/useHistory.ts` - Updated to use Supabase with localStorage fallback
- `app/page.tsx` - Updated to handle async saveToHistory calls

## Security

- Anonymous access is currently enabled for ease of setup
- For production, consider implementing user authentication and updating RLS policies
- The database password mentioned in the issue (parapancham) is for admin access to set up the table