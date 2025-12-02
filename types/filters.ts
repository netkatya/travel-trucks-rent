import { EquipmentKey } from "./camper";

export interface CamperFilters {
  location?: string;
  form?: "panelTruck" | "fullyIntegrated" | "alcove";
  equipment?: EquipmentKey[];
}

export type CamperForm = "panelTruck" | "fullyIntegrated" | "alcove";

export type EquipmentFilter =
  | "AC"
  | "automatic"
  | "kitchen"
  | "TV"
  | "bathroom";
