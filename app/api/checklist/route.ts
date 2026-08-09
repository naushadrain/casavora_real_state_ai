import { NextResponse } from "next/server";
import { createAirtableRecord, updateAirtableRecord } from "@/lib/airtable";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !Array.isArray(body.items) || !body.items.every((i: unknown) => typeof i === "string")) {
    return NextResponse.json({ success: false, error: "'items' must be a string array" }, { status: 400 });
  }

  try {
    if (typeof body.id === "string" && body.id) {
      await updateAirtableRecord(body.id, { "Pain Points": body.items });
      return NextResponse.json({ success: true, id: body.id });
    }

    const record = await createAirtableRecord({
      "Pain Points": body.items,
    });
    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
