import { EquipmentKey } from "./camper";

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  equipment?: Exclude<EquipmentKey, "automatic">[];
  transmission?: "automatic";
}

export type CamperForm = "panelTruck" | "fullyIntegrated" | "alcove";

export type EquipmentFilter =
  | "AC"
  | "automatic"
  | "kitchen"
  | "TV"
  | "bathroom";

export interface FetchCampersParams {
  page?: number;
  limit?: number;
  filters?: CamperFilters;
}

export interface CamperQueryParams {
  page?: number;
  limit?: number;
  location?: string;
  form?: string;

  AC?: boolean;
  kitchen?: boolean;
  TV?: boolean;
  bathroom?: boolean;
  transmission?: "automatic";
}
