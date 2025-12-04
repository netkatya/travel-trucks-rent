import { CamperQueryParams, FetchCampersParams } from "@/types/filters";
import { nextServer } from "./api";
import { Camper } from "@/types/camper";

export const fetchCampers = async ({
  page = 1,
  limit = 4,
  filters,
}: FetchCampersParams = {}): Promise<Camper[]> => {
  const params: CamperQueryParams = { page, limit };

  if (filters?.location) params.location = filters.location;
  if (filters?.form) params.form = filters.form;
  if (filters?.transmission) params.transmission = filters.transmission;

  if (filters?.equipment?.length) {
    filters.equipment.forEach((key) => {
      // key: "AC" | "kitchen" | "TV" | "bathroom"
      params[key] = true;
    });
  }

  const res = await nextServer.get("/campers", { params });

  return res.data.items;
};

export const fetchCamper = async (id: string): Promise<Camper> => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
