import { NextResponse } from "next/server";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { differenceInSeconds } from "date-fns";

let userRows: any = [];
let cachingTimestamp = new Date();
const CACHE_LIMIT_IN_SECS = 10;

export async function GET() {
  const now = new Date();
  if (!userRows || userRows.length === 0 || differenceInSeconds(now, cachingTimestamp) > CACHE_LIMIT_IN_SECS) {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || "", {
      apiKey: process.env.GOOGLE_API_KEY || "",
    });

    await doc.loadInfo(); // loads document properties and worksheets
    const sheet = doc.sheetsByIndex[0];
    userRows = await sheet.getRows();
    cachingTimestamp = now;
  }

  const rowNum = userRows.length;
  const randRow = userRows[Math.floor(Math.random() * rowNum)];

  return NextResponse.json({
    latin: randRow.get("latin"),
    forms: randRow.get("formes"),
    french: randRow.get("français"),
  });
}
