import { VocabRow } from "@/app/types";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { NextResponse } from "next/server";

let userRows: any = [];

export async function GET() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || "", {
    apiKey: process.env.GOOGLE_API_KEY || "",
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  userRows = await sheet.getRows();

  const resultsRows: VocabRow[] = [];
  for (const r of userRows) {
    resultsRows.push({ latin: r.get("latin"), forms: r.get("formes"), french: r.get("français") });
  }

  return NextResponse.json({
    rows: resultsRows,
  });
}
