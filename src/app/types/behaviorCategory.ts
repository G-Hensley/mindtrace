// Import the UUID type from the crypto module
import { UUID } from "crypto";

// Behavior Category Type Definition to save and display behavior category data
export type BehaviorCategory = {
  id?: UUID;
  name: string;
}