// Import the useMutation, useQuery, and useQueryClient hooks from the @tanstack/react-query library
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@supabase/client";
import { Organization } from "@/types/organization";
import { UUID } from "crypto";

// Function to get all organizations
export const getOrganizations = async () => {

  const { data, error } = await supabase
    .from('organization')
    .select('*');

  if (error) throw error;

  return data;

}

// Function to get an organization by id
export const getOrganizationById = async (id: UUID) => {
  const { data, error } = await supabase.from('organization').select('*').eq('id', id);

  if (error) throw error;

  return data;
}

// Function to create an organization
export const createOrganization = async (organization: Organization) => {
  const { data, error } = await supabase.from('organization').insert(organization).select();

  if (error) throw error;

  return data;
}

// React Query hook to get all organizations
export const useGetOrganizations = () => {
  return useQuery({ queryKey: ['organization'], queryFn: getOrganizations });
}

// React Query hook to get an organization by id
export const useGetOrganizationById = (id: UUID) => {
  return useQuery({ queryKey: ['organization', id], queryFn: () => getOrganizationById(id) });
}

// React Query hook to create an organization
export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (organization: Organization) => {
      await createOrganization(organization);

      return organization;
    },
    onSuccess: (data: Organization) => {
      queryClient.setQueryData(['organization'], (old: Organization[]) => [...old, data]);
    },
  })

}