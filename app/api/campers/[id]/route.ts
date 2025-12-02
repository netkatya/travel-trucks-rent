import { NextResponse } from "next/server";
import { api } from "../../api"; // путь к твоему инстансу

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const response = await api.get(`/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch camper details" },
      { status: 500 }
    );
  }
}
