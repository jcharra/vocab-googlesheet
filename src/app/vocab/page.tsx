import { GoogleSpreadsheet } from "google-spreadsheet";
import { VocabRow } from "../types";
import VocabTest from "./VocabTest";

export default async function Vocab() {
  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID || "", {
    apiKey: process.env.GOOGLE_API_KEY || "",
  });

  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  const sheetRows = await sheet.getRows();

  const rows: VocabRow[] = [];
  for (const r of sheetRows) {
    rows.push({ latin: r.get("latin"), forms: r.get("formes"), french: r.get("français") });
  }

  return (
    <div className="flex flex-col">
      <VocabTest rows={rows} />
    </div>
  );
}
