import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect"; // ✅ Ensure correct path
import Donor from "@/models/Donor";

// In-memory OTP store (use Redis or DB in production)
const otpStore = globalThis.otpStore || (globalThis.otpStore = {});

export async function POST(request) {
  try {
    // ✅ Connect to DB first
    await dbConnect();

    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: "Email and OTP are required." },
        { status: 400 }
      );
    }

    const storedOtp = otpStore[email];
    const createdAt = otpStore[email + "_timestamp"];

    if (!storedOtp || !createdAt) {
      return NextResponse.json(
        { success: false, message: "OTP expired or invalid." },
        { status: 400 }
      );
    }

    // Expire after 5 minutes
    if (Date.now() - createdAt > 5 * 60 * 1000) {
      delete otpStore[email];
      delete otpStore[email + "_timestamp"];
      return NextResponse.json(
        { success: false, message: "OTP expired." },
        { status: 400 }
      );
    }

    if (parseInt(otp) !== storedOtp) {
      return NextResponse.json(
        { success: false, message: "Invalid OTP." },
        { status: 400 }
      );
    }

    // Cleanup OTP from memory
    delete otpStore[email];
    delete otpStore[email + "_timestamp"];

    // ✅ Check if donor exists in DB
    const donor = await Donor.findOne({ email });
    if (!donor) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // ✅ Generate JWT
    const token = jwt.sign(
      { phone: donor.contactNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Set secure cookie
    const response = NextResponse.json(
      { success: true, message: "OTP verified successfully." },
      { status: 200 }
    );

    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("❌ OTP verification error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
