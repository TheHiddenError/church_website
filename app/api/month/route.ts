// app/api/month/route.ts
import { NextResponse } from "next/server";
import { getImportantMonthEvents, getMonthEvents } from "@/app/actions/events";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  let adv: string | number | null = searchParams.get("adv");
  adv = adv == null ? 0 : Number(adv);
  const data = {
    important : {},
    regular: {},
  }
  data.important = await getImportantMonthEvents(adv);
  data.regular = await getMonthEvents(adv);

  return NextResponse.json(data);
}