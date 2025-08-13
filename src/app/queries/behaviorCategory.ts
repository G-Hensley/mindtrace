// Import the useQuery hook from the @tanstack/react-query library
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@supabase/client';
import { BehaviorCategory } from '@/types/behaviorCategory';

// Function to get all behavior categories
export const getBehaviorCategories = async () => {
  const { data, error } = await supabase.from('behavior_category').select('*');
  if (error) throw error;
  return data;
};

// Function to get a behavior category by id
export const getBehaviorCategoryById = async (id: string) => {
  const { data, error } = await supabase
    .from('behavior_category')
    .select('*')
    .eq('id', id);
  if (error) throw error;
  return data;
};

// Function to create a behavior category
export const createBehaviorCategory = async (name: string) => {
  const { data, error } = await supabase
    .from('behavior_category')
    .insert({ name })
    .select();
  if (error) throw error;
  return data;
};

// React Query hook to get all behavior categories
export const useGetBehaviorCategories = () => {
  return useQuery({
    queryKey: ['behavior_category'],
    queryFn: getBehaviorCategories,
  });
};

// React Query hook to get a behavior category by id
export const useGetBehaviorCategoryById = (id: string) => {
  return useQuery({
    queryKey: ['behavior_category', id],
    queryFn: () => getBehaviorCategoryById(id),
  });
};

// React Query hook to create a behavior category
export const useCreateBehaviorCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (name: string) => {
      const result = await createBehaviorCategory(name);
      return result[0]; // Return the first (and only) created behavior category
    },
    onSuccess: (data: BehaviorCategory) => {
      queryClient.setQueryData(
        ['behavior_category'],
        (old: BehaviorCategory[]) => [...old, data]
      );
    },
  });
};
