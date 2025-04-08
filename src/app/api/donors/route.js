import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";

// POST: Register new donor
export async function POST(req) {
  await dbConnect();
  try {
    const body = await req.json();
    const newDonor = await Donor.create(body);
    return NextResponse.json(
      { success: true, donor: newDonor },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating donor:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 400 }
    );
  }
}

// GET: Get all available donors
export async function GET() {
  await dbConnect();
  try {
    const donors = await Donor.find({ available: true }).sort({
      registeredAt: -1,
    });
    return NextResponse.json({ success: true, donors });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
