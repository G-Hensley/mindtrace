import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@supabase/client';
import { Log } from '@/types/log';

// Function to create a log entry
const createLogEntry = async (logEntry: Log) => {
  const { data, error } = await supabase
    .from('log_entry')
    .insert(logEntry)
    .select();

  if (error) throw error;
  return data[0];
};

// Function to get all log entries
const getAllLogEntries = async () => {
  const { data, error } = await supabase.from('log_entry').select('*');

  if (error) throw error;
  return data;
};

// Function to update a log entry
const updateLogEntry = async (logEntry: Log, id: string, userId: string) => {
  const { data, error } = await supabase
    .from('log_entry')
    .update(logEntry)
    .eq('id', id)
    .eq('user_id', userId)
    .select();

  if (error) throw error;
  return data[0];
};

// Function to delete a log entry
const deleteLogEntry = async (id: string, userId: string) => {
  const { data, error } = await supabase
    .from('log_entry')
    .delete()
    .eq('id', id)
    .eq('user_id', userId)
    .select();

  if (error) throw error;
  return data[0];
};

// React Query hook to create a log entry
export const useCreateLogEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ logEntry }: { logEntry: Log }) => createLogEntry(logEntry),
    onSuccess: (data: Log) => {
      // Invalidate and refetch all log-related queries
      queryClient.invalidateQueries({ queryKey: ['log_entry'] });
      // Also invalidate any potential student-specific log queries
      queryClient.invalidateQueries({ queryKey: ['log_entry', 'student'] });
      return data;
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};

// React Query hook to get all log entries
export const useGetAllLogEntries = () => {
  return useQuery({
    queryKey: ['log_entry'],
    queryFn: getAllLogEntries,
  });
};

// React Query hook to update a log entry
export const useUpdateLogEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ logEntry, id, userId }: { logEntry: Log, id: string, userId: string }) => updateLogEntry(logEntry, id, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['log_entry'] });
      return true;
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};

// React Query hook to delete a log entry
export const useDeleteLogEntry = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, userId }: { id: string, userId: string }) => deleteLogEntry(id, userId),
    onSuccess: (data: Log) => {
      queryClient.invalidateQueries({ queryKey: ['log_entry'] });
      return data;
    },
    onError: (error: Error) => {
      throw error;
    },
  });
};
