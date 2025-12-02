import { create } from "zustand";
import { nextServer } from "@/lib/api/api";
import { CamperFilters } from "@/types/filters";
import { CampersState } from "@/types/zustand";

export const useCampersStore = create<CampersState>((set, get) => ({
  campers: [],
  favorites: [],
  page: 1,
  limit: 4,
  hasMore: true,
  loading: false,
  filters: {},

  fetchCampers: async () => {
    set({ loading: true, campers: [], page: 1 });
    try {
      const { page, limit, filters } = get();
      const params: Record<string, string | number> = { page, limit };

      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      if (filters.equipment?.length)
        params.equipment = filters.equipment.join(",");

      const res = await nextServer.get("/campers", { params });
      const items = Array.isArray(res.data.items) ? res.data.items : res.data;

      set({
        campers: items,
        hasMore: items.length === limit,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  loadMore: async () => {
    const { page, limit, campers, filters } = get();
    set({ loading: true });
    try {
      const nextPage = page + 1;
      const params: Record<string, string | number> = { page: nextPage, limit };

      if (filters.location) params.location = filters.location;
      if (filters.form) params.form = filters.form;
      if (filters.equipment?.length)
        params.equipment = filters.equipment.join(",");

      const res = await nextServer.get("/campers", { params });
      const newCampers = Array.isArray(res.data.items)
        ? res.data.items
        : res.data;

      set({
        campers: [...campers, ...newCampers],
        page: nextPage,
        hasMore: newCampers.length === limit,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  toggleFavorite: (id: string) => {
    const { favorites } = get();
    if (favorites.includes(id)) {
      set({ favorites: favorites.filter((fav) => fav !== id) });
    } else {
      set({ favorites: [...favorites, id] });
    }
  },

  setFilters: (filters: CamperFilters) => {
    set({ filters });
    get().fetchCampers();
  },
}));
