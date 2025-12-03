import { Camper } from "./camper";
import { CamperFilters } from "./filters";

export interface CampersState {
  campers: Camper[];
  favorites: string[];
  page: number;
  limit: number;
  hasMore: boolean;
  loading: boolean;
  filters: CamperFilters;
  fetchCampers: (reset?: boolean) => Promise<void>;
  loadMore: () => Promise<void>;
  toggleFavorite: (id: string) => void;
  setFilters: (filters: CamperFilters) => void;
}
