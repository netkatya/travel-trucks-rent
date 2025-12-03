import { NextRequest, NextResponse } from "next/server";
import { Camper } from "@/types/camper";
import { api } from "../api";

type CamperApiResponse = Camper[] | { items: Camper[] };

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "4");

    const location = searchParams.get("location") || "";
    const form = searchParams.get("form") || "";
    const transmission = searchParams.get("transmission") || "";
    const equipment = searchParams.get("equipment")?.split(",") || [];

    const response = await api.get<CamperApiResponse>("/campers");

    let items: Camper[];

    if (Array.isArray(response.data)) {
      items = response.data;
    } else {
      items = response.data.items;
    }

    if (location) {
      const loc = location.toLowerCase();
      items = items.filter((c) => c.location.toLowerCase().includes(loc));
    }

    if (form) {
      items = items.filter((c) => c.form === form);
    }

    if (transmission) {
      items = items.filter((c) => c.transmission === transmission);
    }

    if (equipment.length) {
      items = items.filter((c) =>
        equipment.every((k) => c[k as keyof Camper] === true)
      );
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = items.slice(start, end);
    const hasMore = end < items.length;

    return NextResponse.json({
      items: paginated,
      total: items.length,
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
