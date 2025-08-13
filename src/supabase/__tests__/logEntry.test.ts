import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { createLogEntry } from '../logEntry';
import { supabase } from '../client';

// Mock the Supabase client
vi.mock('../client', () => ({
  supabase: {
    from: vi.fn(() => ({
        // Mock the from method to return an object with the insert method
      insert: vi.fn((data) => {
        const entry = data[0];
        if (!entry.student_id || !entry.category_id || !entry.notes || !entry.mood) {
            return Promise.resolve({
                data:null,
                error: { message: 'Missing required fields' },
            });
        }

        return Promise.resolve({
            data: [{ id: 'log-id' }],
            error: null,
        });
      })
    })),
  },
}));

// Test suite for the createLogEntry function
describe('createLogEntry', () => {

    // Reset the mock before each test
    beforeEach(() => {
    vi.clearAllMocks();
    });

    // Reset the mock after each test
    afterEach(() => {
        vi.clearAllMocks();
    });

    // Test for creating a new log entry with valid data
    it('creates a new log entry with valid data', async () => {
        const result = await createLogEntry(
        '448',
        'category-uuid',
        'Focused during session',
        '😊'
    );

    // Check that the supabase.from method was called with 'log_entry'
    expect(supabase.from).toHaveBeenCalledWith('log_entry');
    expect(result.data).toEqual([{ id: 'log-id' }]);
    expect(result.error).toBeNull();
    });

    // Test for missing required fields
    it('should fail to create a log entry with missing required fields', async () => {
        const result = await createLogEntry('', '', '', '');

        // Check that the supabase.from method was called with 'log_entry'
        expect(supabase.from).toHaveBeenCalledWith('log_entry');
        expect(result.error).not.toBeNull();
    });

});
