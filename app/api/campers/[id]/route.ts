import { NextResponse } from "next/server";
import { api } from "../../api";
import { Camper } from "@/types/camper";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await api.get<Camper>(`/campers/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch camper details" },
      { status: 500 }
    );
  }
}
