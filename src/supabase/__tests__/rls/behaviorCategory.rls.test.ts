// This file contains tests for the RLS policies on the behavior_category table in Supabase.
// it checks select and insert operations based on the authenticated user's organization.

import { getAuthenticatedClient } from "../setupTestUser";
import { describe, it, expect, beforeAll } from "vitest";

// Set supabase client type
let supabase: Awaited<ReturnType<typeof getAuthenticatedClient>>;

// Before all tests, get the authenticated Supabase client
beforeAll(async () => {
    supabase = await getAuthenticatedClient();
});

// Test suite for RlS policies on the behavior_category table
describe("RLS: behavior_category table", () => {

  // Test to ensure the authenticated user can view all behavior categories
  it("should allow viewing all behavior categories that exist", async () => {
    const { data, error } = await supabase.from("behavior_category").select();
    expect(error).toBeNull();
    expect(data?.length).toBeGreaterThan(0);
  });

  // Test to ensure the authenticated user can insert a new behavior category
  it("should allow inserting a new behavior category", async () => {
    // Create a random name for the new behavior category
    const randomName = `Behavior Category ${Math.floor(Math.random() * 1000)}`;

    const { data, error } = await supabase.from("behavior_category").insert({
      name: randomName
    }).select();
    expect(error).toBeNull();
    expect(data?.[0]?.name).toBe(randomName);
  });

})