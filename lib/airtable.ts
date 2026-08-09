type AirtableFieldValue = string | number | string[];

export async function createAirtableRecord(fields: Record<string, AirtableFieldValue>) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error("Missing AIRTABLE_PAT, AIRTABLE_BASE_ID, or AIRTABLE_TABLE_NAME in .env");
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message ?? `Airtable request failed with status ${res.status}`);
  }

  return data as { id: string };
}

export async function updateAirtableRecord(id: string, fields: Record<string, AirtableFieldValue>) {
  const { AIRTABLE_PAT, AIRTABLE_BASE_ID, AIRTABLE_TABLE_NAME } = process.env;

  if (!AIRTABLE_PAT || !AIRTABLE_BASE_ID || !AIRTABLE_TABLE_NAME) {
    throw new Error("Missing AIRTABLE_PAT, AIRTABLE_BASE_ID, or AIRTABLE_TABLE_NAME in .env");
  }

  const res = await fetch(
    `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}/${id}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${AIRTABLE_PAT}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data?.error?.message ?? `Airtable request failed with status ${res.status}`);
  }

  return data as { id: string };
}
