// app/api/trip-agent/route.ts
import { NextResponse } from "next/server";
import { TripPlanningAgent } from "@/lib/agents/planner";

type TripPlannerPayload = {
  destination?: string;
  startDate?: string;
  endDate?: string;
  travelers?: string;
  budget?: string;
  interests?: string;
  startLocation?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as TripPlannerPayload;

    const {
      destination,
      startDate,
      endDate,
      travelers = "solo",
      budget = "balanced",
      interests = "",
      startLocation,
    } = body;

    if (!destination) {
      return NextResponse.json(
        { error: "Destination is required" },
        { status: 400 }
      );
    }

    const dateRange =
      startDate && endDate
        ? `${startDate} to ${endDate}`
        : startDate || endDate || "Dates not provided";

    const itenery = await TripPlanningAgent(
      startLocation?.trim() || "User location not provided",
      destination.trim(),
      travelers,
      dateRange,
      budget,
      interests.trim() || "Create a comprehensive itinerary."
    );
    console.log('this in route:',itenery);
    return NextResponse.json({ ok: true, itenery }, { status: 200 });
  } catch (err) {
    console.error("Trip agent error:", err);
    return NextResponse.json(
      { error: "Unable to process trip planning request" },
      { status: 500 }
    );
  }
}
