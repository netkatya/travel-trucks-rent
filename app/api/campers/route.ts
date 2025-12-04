import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../api";

const booleanFilters = [
  "AC",
  "bathroom",
  "kitchen",
  "TV",
  "radio",
  "refrigerator",
  "microwave",
  "gas",
  "water",
] as const;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 4);

    const params: Record<string, string | number | boolean> = {
      page,
      limit,
    };

    const stringFilters = [
      "location",
      "form",
      "transmission",
      "engine",
    ] as const;
    stringFilters.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params[key] = value;
    });

    booleanFilters.forEach((key) => {
      const value = searchParams.get(key);
      if (value) params[key] = true;
    });

    const res = await api("/campers", { params });

    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
