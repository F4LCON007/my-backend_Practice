import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import corsHeaders from "./lib/cors";

export function proxy(request) {
  if (request.method === "OPTIONS") return NextResponse.next();
  try {
    const token = request.cookies.get("token")?.value;
    jwt.verify(token, process.env.JWT_SECRET);
    return NextResponse.next();
  } catch {
    return NextResponse.json(
      { message: "Unauthorized Request" },
      { status: 401, headers: corsHeaders },
    );
  }
}

export const config = { matcher: ["/api/note/:path*"] };
