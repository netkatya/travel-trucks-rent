import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { Camper } from "@/types/camper";

interface CampersApiResponse {
  items: Camper[];
  total?: number;
  page?: number;
  limit?: number;
  hasMore?: boolean;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "4", 10);

    const location = searchParams.get("location");
    const form = searchParams.get("form");
    const transmission = searchParams.get("transmission");

    const AC = searchParams.get("AC");
    const TV = searchParams.get("TV");
    const kitchen = searchParams.get("kitchen");
    const bathroom = searchParams.get("bathroom");

    const params: Record<string, string | number | boolean> = {
      page,
      limit,
      ...(location && { location }),
      ...(transmission && { transmission }),
      ...(AC && { AC: true }),
      ...(TV && { TV: true }),
      ...(kitchen && { kitchen: true }),
      ...(bathroom && { bathroom: true }),
      ...(form && { form }),
    };

    const res = await api.get<CampersApiResponse | Camper[]>("/campers", {
      params,
    });

    let items: Camper[];
    if (Array.isArray(res.data)) {
      items = res.data;
    } else {
      items = res.data.items;
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = items.slice(start, end);
    const hasMore = end < items.length;

    return NextResponse.json({
      items: paginated,
      total: items.length,
      page,
      limit,
      hasMore,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch campers" },
      { status: 500 }
    );
  }
}
