// Import the useMutation, useQuery, and useQueryClient hooks from the @tanstack/react-query library
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@supabase/client';
import { Student } from '@/types/student';

// Function to get students in the same organization
export const getStudentsInSameOrganization = async (orgId: string) => {
  const { data, error } = await supabase
    .from('student')
    .select('*')
    .eq('organization_id', orgId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to get a student by their ID
export const getStudentById = async (id: string, orgId: string) => {
  const { data, error } = await supabase
    .from('student')
    .select('*')
    .eq('id', id)
    .eq('organization_id', orgId);

  if (error) {
    throw error;
  }

  return data;
};

// Function to create a student
export const createStudent = async (student: Student) => {
  const { data, error } = await supabase
    .from('student')
    .insert(student)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Function to update a student
export const updateStudent = async (student: Student, orgId: string) => {
  const { data, error } = await supabase
    .from('student')
    .update(student)
    .eq('id', student.id)
    .eq('organization_id', orgId)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Function to delete a student
export const deleteStudent = async (id: string, orgId: string) => {
  const { error } = await supabase
    .from('student')
    .delete()
    .eq('id', id)
    .eq('organization_id', orgId);

  if (error) {
    throw error;
  }
};

// React Query hook to get students in the same organization
export const useGetStudentsInSameOrganization = (orgId: string) => {
  return useQuery({
    queryKey: ['student', orgId],
    queryFn: () => getStudentsInSameOrganization(orgId),
  });
};

// React Query hook to get a student by their ID
export const useGetStudentById = (id: string, orgId: string) => {
  return useQuery({
    queryKey: ['student', id, orgId],
    queryFn: () => getStudentById(id, orgId),
  });
};

// React Query hook to create a student
export const useCreateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: Student) => createStudent(student),
    onSuccess: (data: Student) => {
      queryClient.invalidateQueries({ queryKey: ['student'] });
      queryClient.setQueryData(['student', data.id], data);
    },
  });
};

// React Query hook to update a student
export const useUpdateStudent = (orgId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (student: Student) => updateStudent(student, orgId),
    onSuccess: (data: Student) => {
      queryClient.invalidateQueries({ queryKey: ['student'] });
      queryClient.setQueryData(['student', data.id], data);
    },
  });
};

// React Query hook to delete a student
export const useDeleteStudent = (orgId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStudent(id, orgId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student'] });
    },
  });
};