import { NextResponse } from "next/server";
import corsHeaders from "./cors";

export const ok = (data, status = 200) =>
  NextResponse.json(data, { status, headers: corsHeaders });

export const fail = (message, status = 400) =>
  NextResponse.json({ message }, { status, headers: corsHeaders });
