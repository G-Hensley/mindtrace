import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from the .env file
dotenv.config({ path: '../../apps/api/.env' })

// Create an anon client for Supabase
const anonClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

let supabase: ReturnType<typeof createClient>;

// Before the tests are run
export const getAuthenticatedClient = async () => {
    // Ensure the test user is signed in
    const { data, error } = await anonClient.auth.signInWithPassword({
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!
    });

    // If there was an error or no session data, throw an error
    if (error || !data.session) throw new Error('Failed to sign in test user');

    // Create an authenticated client with the user's token
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            global: {
                headers: {
                    // Set the Authorization header with the user's access token
                    Authorization: `Bearer ${data.session.access_token}`
                },
            },
        }
    );
};