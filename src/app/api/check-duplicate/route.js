import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";

export async function POST(request) {
  try {
    await dbConnect();
    const { email, phone } = await request.json();

    // Check for existing phone number
    if (phone) {
      const phoneExists = await Donor.findOne({ contactNumber: phone });
      if (phoneExists) {
        return NextResponse.json({
          exists: true,
          field: "phone",
          message: "This phone number is already registered",
        });
      }
    }

    // Check for existing email
    if (email) {
      const emailExists = await Donor.findOne({ email });
      if (emailExists) {
        return NextResponse.json({
          exists: true,
          field: "email",
          message: "This email is already registered",
        });
      }
    }

    return NextResponse.json({ exists: false });
  } catch (error) {
    console.error("Check duplicate error:", error);
    return NextResponse.json(
      { message: "Failed to check for duplicates" },
      { status: 500 }
    );
  }
}
