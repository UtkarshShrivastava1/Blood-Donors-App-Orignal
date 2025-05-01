import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import axios from "axios";

// GET: Search donors based on filters
export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const state = searchParams.get("state");
    const district = searchParams.get("district");
    const city = searchParams.get("city");
    const bloodGroup = searchParams.get("bloodGroup");

    // Build dynamic query object
    const query = { available: true };

    if (state) query.state = state;
    if (district) query.district = district;
    if (city) query.city = city;
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query).sort({ registeredAt: -1 });

    return NextResponse.json({
      success: true,
      donors,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch donors" },
      { status: 500 }
    );
  }
}

// Example usage of the API
async function fetchDonors(
  selectedState,
  selectedDistrict,
  selectedCity,
  selectedBloodGroup
) {
  const res = await axios.get("/api/donors", {
    params: {
      state: selectedState,
      district: selectedDistrict,
      city: selectedCity,
      bloodGroup: selectedBloodGroup,
    },
  });
  return res.data;
}
