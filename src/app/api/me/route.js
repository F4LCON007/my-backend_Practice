import jwt from "jsonwebtoken";
import { ok, fail } from "@/lib/utils";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return ok({ user: { email: user.email, username: user.username } });
  } catch {
    return fail("Unauthorized Request", 401);
  }
}
