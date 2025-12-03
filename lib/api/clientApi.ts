import { FetchCampersParams } from "@/types/filters";
import { nextServer } from "./api";
import { Camper } from "@/types/camper";

type FetchParams = {
  page: number;
  limit: number;
  location?: string;
  form?: string;
  transmission?: string;
  equipment?: string[];
};

export const fetchCampers = async ({
  page = 1,
  limit = 4,
  filters,
}: FetchCampersParams = {}): Promise<Camper[]> => {
  const params: FetchParams = { page, limit };

  if (filters?.location) params.location = filters.location;
  if (filters?.form) params.form = filters.form;
  if (filters?.transmission) params.transmission = filters.transmission;
  if (filters?.equipment?.length) params.equipment = filters.equipment;

  const res = await nextServer.get("/campers", { params });

  return res.data.items;
};

export const fetchCamper = async (id: string): Promise<Camper> => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
