export type EquipmentKey = "AC" | "automatic" | "kitchen" | "TV" | "bathroom";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: "panelTruck" | "fullyIntegrated" | "alcove";
  length: string;
  width: string;
  height: string;
  tank: string;
  consumption: string;

  transmission: "manual" | "automatic";
  engine: string;

  AC: boolean;
  bathroom: boolean;
  kitchen: boolean;
  TV: boolean;
  radio: boolean;
  refrigerator: boolean;
  microwave: boolean;
  gas: boolean;
  water: boolean;

  gallery: CamperGalleryItem[];
  reviews: CamperReview[];
}

export interface CamperGalleryItem {
  thumb: string;
  original: string;
}

export interface CamperReview {
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface CamperDetailsPageProps {
  id: string;
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

export interface CampersApiResponse {
  total: number;
  items: Camper[];
}
