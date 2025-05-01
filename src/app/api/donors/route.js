import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";

// GET: Search donors based on filters
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");
    const district = searchParams.get("district");
    const city = searchParams.get("city");
    const bloodGroup = searchParams.get("bloodGroup");

    const query = {
      available: true,
      state: state,
    };

    if (district) query.district = district;
    if (city) query.city = city;
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query)
      .select("-email -contactNumber -password -otp -otpExpiry")
      .sort({ registeredAt: -1 });

    return NextResponse.json({
      success: true,
      donors,
      count: donors.length,
    });
  } catch (err) {
    console.error("Search error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}
