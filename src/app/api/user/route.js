import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Donor from "@/models/Donor";
import dbConnect from "@/lib/dbConnect";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// Helper: Extract phone from JWT stored in cookies
async function getPhoneFromToken(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) {
    console.error("No token found");
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.phone;
  } catch (error) {
    console.error("JWT Verification Error:", error);
    return null;
  }
}

// GET: Fetch user profile
export async function GET(request) {
  try {
    await dbConnect();
    const phone = await getPhoneFromToken(request);

    if (!phone) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const user = await Donor.findOne({ contactNumber: phone });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT: Update user profile or availability
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

    const updateObject = {
      ...updateData,
      fullAddress: updateData.fullAddress || "",
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
