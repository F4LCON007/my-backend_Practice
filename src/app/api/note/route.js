import { getClientPromise } from "@/lib/mongodb";
import { ok, fail } from "@/lib/utils";
import corsHeaders from "@/lib/cors";

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function GET(request) {
  try {
    const db = (await getClientPromise()).db(process.env.DB_NAME);
    const notes = await db.collection("note").find({}).toArray();
    return ok({ notes });
  } catch (e) {
    console.log(e);
    return fail("GET note error", 500);
  }
}

export async function POST(request) {
  try {
    const { text } = await request.json();
    const db = (await getClientPromise()).db(process.env.DB_NAME);
    const r = await db
      .collection("note")
      .insertOne({ text, createdAt: new Date() });
    return ok({ id: r.insertedId }, 201);
  } catch (e) {
    console.log(e);
    return fail("POST note error", 500);
  }
}
