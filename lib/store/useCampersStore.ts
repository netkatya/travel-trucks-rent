import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CampersState } from "@/types/zustand";
import { CamperFilters } from "@/types/filters";
import { fetchCampers as fetchCampersApi } from "../api/clientApi";

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => ({
      campers: [],
      favorites: [],
      page: 1,
      limit: 4,
      hasMore: true,
      loading: false,
      filters: {},

      fetchCampers: async (reset: boolean = true) => {
        const { filters, limit, page, campers, loading } = get();
        if (loading) return;

        set({ loading: true });

        const currentPage = reset ? 1 : page;

        try {
          const items = await fetchCampersApi({
            page: currentPage,
            limit,
            filters,
          });

          let filteredItems = items;
          if (filters?.equipment?.length) {
            filteredItems = filteredItems.filter((camper) =>
              filters.equipment!.every(
                (key) => camper[key as keyof typeof camper] === true
              )
            );
          }

          set({
            campers: reset ? filteredItems : [...campers, ...filteredItems],
            page: currentPage,
            hasMore: filteredItems.length === limit,
            loading: false,
          });
        } catch (error) {
          console.error(error);
          set({ loading: false });
        }
      },

      loadMore: async () => {
        const { page, hasMore, loading } = get();
        if (loading || !hasMore) return;
        await get().fetchCampers(false);
        set({ page: page + 1 });
      },

      toggleFavorite: (id: string) => {
        const { favorites } = get();
        set({
          favorites: favorites.includes(id)
            ? favorites.filter((f) => f !== id)
            : [...favorites, id],
        });
      },

      setFilters: (filters: CamperFilters) => {
        set({ filters, page: 1 });
        get().fetchCampers(true);
      },
    }),
    {
      name: "campers-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
