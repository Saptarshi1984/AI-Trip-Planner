// app/api/trip-agent/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // { ... }
    // do work...
    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
