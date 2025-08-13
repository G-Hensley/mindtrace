// Import the UUID type from the crypto module
import { UUID } from "crypto";

// Profile Type Definition to save and display profile data
export type Profile = {
  first_name: string;
  last_name: string;
  role: string;
  organization_id: UUID;
  avatar: File | string | null;
  user_id?: UUID;
};
