import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";

// GET: Search donors based on filters
export async function GET(req) {
  await dbConnect();

  const { searchParams } = new URL(req.url);
  const state = searchParams.get("state");
  const district = searchParams.get("district");
  const city = searchParams.get("city");
  const bloodGroup = searchParams.get("bloodGroup");

  try {
    // Build dynamic query object
    const query = { available: true };

    if (state) query.state = state;
    if (district) query.district = district;
    if (city) query.city = city;
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query).sort({ registeredAt: -1 });

    return NextResponse.json({ success: true, donors });
  } catch (err) {
    console.error("Error searching donors:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
