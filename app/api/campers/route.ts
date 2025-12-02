import { NextRequest, NextResponse } from "next/server";

import { Camper } from "@/types/camper";
import { api } from "../api";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "4");

    const response = await api.get<Camper[]>("/campers", {
      params: { page, limit },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch campers" },
      { status: 500 }
    );
  }
}
