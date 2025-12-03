import { create } from "zustand";
import { nextServer } from "@/lib/api/api";
import { CamperFilters } from "@/types/filters";
import { CampersState } from "@/types/zustand";
import { persist } from "zustand/middleware";

export const useCampersStore = create<CampersState>()(
  persist(
    (set, get) => {
      const buildParams = (page: number) => {
        const { limit, filters } = get();
        const params: Record<string, string | number> = { page, limit };

        if (filters.location) params.location = filters.location;
        if (filters.form) params.form = filters.form;
        if (filters.equipment?.length)
          params.equipment = filters.equipment.join(",");

        return params;
      };

      return {
        campers: [],
        favorites: [],
        page: 1,
        limit: 4,
        hasMore: true,
        loading: false,
        filters: {},

        fetchCampers: async () => {
          if (get().loading) return;

          set({ loading: true, campers: [], page: 1 });

          try {
            const params = buildParams(1);
            const res = await nextServer.get("/campers", { params });

            const items = Array.isArray(res.data.items)
              ? res.data.items
              : res.data;

            set({
              campers: items,
              hasMore: items.length === get().limit,
              loading: false,
            });
          } catch (error) {
            console.error(error);
            set({ loading: false });
          }
        },

        loadMore: async () => {
          const { page, loading, hasMore, campers } = get();
          if (loading || !hasMore) return;

          set({ loading: true });

          try {
            const nextPage = page + 1;
            const params = buildParams(nextPage);

            const res = await nextServer.get("/campers", { params });
            const newCampers = Array.isArray(res.data.items)
              ? res.data.items
              : res.data;

            set({
              campers: [...campers, ...newCampers],
              page: nextPage,
              hasMore: newCampers.length === get().limit,
              loading: false,
            });
          } catch (error) {
            console.error(error);
            set({ loading: false });
          }
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
          get().fetchCampers();
        },
      };
    },
    {
      name: "campers-storage",
      partialize: (state) => ({
        favorites: state.favorites,
        filters: state.filters,
      }),
    }
  )
);
