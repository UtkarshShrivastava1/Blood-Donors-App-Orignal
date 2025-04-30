import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Donor from "@/models/Donor"; // Adjust your model path
import dbConnect from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// Helper function to get phone number from JWT token
async function getPhoneFromToken(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.phone; // Return the phone number from the decoded token
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}

// GET profile data
export async function GET(request) {
  await dbConnect();

  const phone = await getPhoneFromToken(request);

  if (!phone) {
    return NextResponse.json(
      { error: "Unauthorized: No valid token" },
      { status: 401 }
    );
  }

  const user = await Donor.findOne({ contactNumber: phone });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT to update availability or profile
export async function PUT(request) {
  try {
    await dbConnect();

    const phone = await getPhoneFromToken(request);
    if (!phone) {
      return NextResponse.json(
        { message: "Unauthorized: No valid token" },
        { status: 401 }
      );
    }

    const updateData = await request.json();

    // Include fullAddress in the update
    const updateObject = {
      ...updateData,
      fullAddress: updateData.fullAddress || "", // Ensure fullAddress is included
    };

    const user = await Donor.findOneAndUpdate(
      { contactNumber: phone },
      updateObject,
      { new: true, runValidators: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to update user" },
      { status: 500 }
    );
  }
}
