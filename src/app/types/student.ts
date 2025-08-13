// Import the UUID type from the crypto module
import { UUID } from "crypto";

// Student Type Definition to save and display student data
export type Student = {
  id: string;
  first_name: string;
  last_name: string;
  organization_id: UUID;
  dob: Date;
}