import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory OTP store (use Redis or DB in production)
const otpStore = globalThis.otpStore || (globalThis.otpStore = {});

export async function POST(request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { success: false, message: "Email is required." },
      { status: 400 }
    );
  }

  // Throttle: Only allow new OTP every 60 seconds
  const lastSentTime = otpStore[email + "_timestamp"];
  if (lastSentTime && Date.now() - lastSentTime < 60 * 1000) {
    return NextResponse.json(
      {
        success: false,
        message: "Please wait 1 minute before requesting a new OTP.",
      },
      { status: 429 }
    );
  }

  const generatedOTP = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${generatedOTP}. It will expire in 5 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);

    // Store OTP and timestamp
    otpStore[email] = generatedOTP;
    otpStore[email + "_timestamp"] = Date.now();

    return NextResponse.json(
      { success: true, message: "OTP sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to send OTP:", error);
    return NextResponse.json(
      { success: false, message: "Failed to send OTP." },
      { status: 500 }
    );
  }
}
