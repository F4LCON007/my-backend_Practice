import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import corsHeaders from "@/lib/cors";
import { fail } from "@/lib/utils";

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(request) {
  const { email, password } = await request.json();
  if (email !== process.env.ADMIN_USER || password !== process.env.ADMIN_PASS) {
    return fail("Invalid email or password", 401);
  }
  const token = jwt.sign({ email, username: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  const res = NextResponse.json(
    { message: "Login successful" },
    { headers: corsHeaders },
  );
  const prod = process.env.NODE_ENV === "production";
  res.cookies.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    sameSite: prod ? "none" : "lax",
    secure: prod,
  });
  return res;
}
