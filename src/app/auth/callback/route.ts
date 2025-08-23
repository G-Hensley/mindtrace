import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/supabase/client';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');

  if (code) {
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
      console.error('Error exchanging code for session:', error);
      // Redirect to home with error
      return NextResponse.redirect(`${requestUrl.origin}/?error=auth_error`);
    }

    // If this is a password recovery, redirect to reset password page
    if (type === 'recovery') {
      return NextResponse.redirect(`${requestUrl.origin}/reset-password`);
    }
    
    // Otherwise redirect to dashboard
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
  }

  // No code provided, redirect to home
  return NextResponse.redirect(`${requestUrl.origin}/`);
}
