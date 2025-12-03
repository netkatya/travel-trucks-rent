import { nextServer } from "./api";
import { Camper } from "@/types/camper";

export const fetchCampers = async (page = 1, limit = 4): Promise<Camper[]> => {
  const res = await nextServer.get("/campers", {
    params: { page, limit },
  });
  return res.data;
};

export const fetchCamper = async (id: string): Promise<Camper> => {
  const res = await nextServer.get(`/campers/${id}`);
  return res.data;
};
