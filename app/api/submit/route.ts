import { NextResponse } from "next/server";
import { createAirtableRecord } from "@/lib/airtable";

const SOURCES = ["Survey", "Newsletter", "Footer", "Founding Members"] as const;
type Source = (typeof SOURCES)[number];

function isSource(value: unknown): value is Source {
  return typeof value === "string" && (SOURCES as readonly string[]).includes(value);
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !isSource(body.source)) {
    return NextResponse.json({ success: false, error: "Invalid or missing 'source'" }, { status: 400 });
  }
  if (typeof body.email !== "string" || !body.email.includes("@")) {
    return NextResponse.json({ success: false, error: "Valid 'email' is required" }, { status: 400 });
  }

  const fields: Record<string, string | number | string[]> = {
    Email: body.email,
    Source: body.source,
  };

  if (typeof body.tool === "string" && body.tool) fields["Current Tool"] = body.tool;
  if (typeof body.stress === "number") fields["Stress Level"] = body.stress;
  if (Array.isArray(body.tasks) && body.tasks.length) fields["Hardest Tasks"] = body.tasks.join(", ");
  if (typeof body.pay === "string" && body.pay) fields["Would Pay"] = body.pay;

  try {
    const record = await createAirtableRecord(fields);
    return NextResponse.json({ success: true, id: record.id });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Unknown error" },
      { status: 502 }
    );
  }
}
