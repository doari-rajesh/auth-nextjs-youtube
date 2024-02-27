import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({
    message: "Logiut successfully",
    success: true,
  });

  response.cookies.set("token", "");
  return response;
}
