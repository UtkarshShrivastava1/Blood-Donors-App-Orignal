import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "contactNumber",
      "email",
      "bloodGroup",
      "state",
      "district",
    ];

    const missingFields = requiredFields.filter((field) => !data[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          message: `Missing required fields: ${missingFields.join(", ")}`,
          success: false,
        },
        { status: 400 }
      );
    }

    // Check if email or phone already exists
    const existingUser = await Donor.findOne({
      $or: [{ email: data.email }, { contactNumber: data.contactNumber }],
    });

    if (existingUser) {
      const field = existingUser.email === data.email ? "email" : "phone";
      return NextResponse.json(
        {
          message: `This ${field} is already registered`,
          success: false,
        },
        { status: 400 }
      );
    }

    // Create new donor
    const donor = await Donor.create({
      name: data.name,
      contactNumber: data.contactNumber,
      email: data.email,
      bloodGroup: data.bloodGroup,
      gender: data.gender || "",
      age: data.age || "",
      state: data.state,
      district: data.district,
      city: data.city || "",
      address: data.address || "",
      pincode: data.pincode || "",
      available: true,
      lastDonated: data.lastDonated || null,
      consent: data.consent || false,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Registration successful",
        donor: {
          name: donor.name,
          email: donor.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to register donor",
      },
      { status: 500 }
    );
  }
}
