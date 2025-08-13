// This file contains tests for the RLS policies on the organization table in Supabase.
// It checks select and insert operations based on the authenticated user's organization.

import { getAuthenticatedClient } from '../setupTestUser';
import { describe, it, expect, beforeAll } from 'vitest';

// set supabase client type
let supabase: Awaited<ReturnType<typeof getAuthenticatedClient>>;

// Before all tests, get the authenticated Supabase client
beforeAll(async () => {
  supabase = await getAuthenticatedClient();
});

// Test suite for RLS policies on the organization table
describe('RLS: organization table', () => {
  // Test to ensure you can view all organizations
  it('should allow viewing all organizations', async () => {
    const { data, error } = await supabase.from('organization').select();
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });

  // Test to ensure authenticated users can insert a new organization
  it('should allow inserting a new organization', async () => {
    const uniqueName = `Test Organization ${Date.now()}`;
    const { data, error } = await supabase
      .from('organization')
      .insert({
        name: uniqueName,
      })
      .select();

    expect(error).toBeNull();
    expect(data?.[0]?.name).toBe(uniqueName);
  });
});
