import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { supabase } from '../client';


// Mock the Supabase client
vi.mock('../client', () => ({
    supabase: {
        from: vi.fn().mockReturnThis(),
        // Mock the select method to return a resolved promise with test data
        select: vi.fn().mockResolvedValue({ data: [{ id: 'test-id' }], error: null }),
        // Mock the insert method to return a resolved promise with test data
        insert: vi.fn().mockResolvedValue({ data: [{ id: 'test-id' }], error: null }),
        // Mock the update method to return a resolved promise with test data
        update: vi.fn().mockResolvedValue({ data: [{ id: 'test-id' }], error: null }),
        // Mock the delete method to return a resolved promise with test data
        delete: vi.fn().mockResolvedValue({ data: [{ id: 'test-id' }], error: null }),
    },
}));

// Test suite for the Supabase client mock for the 'student' table
describe('Supabase client mock', () => {
    // Reset the mock before each test
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Reset the mock after each test
    afterEach(() => {
        vi.clearAllMocks();
    });

    // Run the select test
    it('should return mocked data from the supabase client', async () => {
        const { data, error } = await supabase.from('student').select();
        expect(data).toEqual([{ id: 'test-id' }]);
        expect(error).toBeNull();
    });

    // Run the insert test
    it('should insert data into the supabase client', async () => {
        const { data, error } = await supabase.from('student').insert({ id: 'test-id' });
        expect(data).toEqual([{ id: 'test-id' }]);
        expect(error).toBeNull();
    });

    // Run the update test
    it('should update data in the supabase client', async () => {
        const { data, error } = await supabase.from('student').update({ id: 'test-id' });
        expect(data).toEqual([{ id: 'test-id' }]);
        expect(error).toBeNull();
    });

    // Run the delete test
    it('should delete data from the supabase client', async () => {
        const { data, error } = await supabase.from('student').delete();
        expect(data).toEqual([{ id: 'test-id' }]);
        expect(error).toBeNull();
    });

})