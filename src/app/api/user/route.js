import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Donor from "@/models/Donor"; // adjust path if needed
import dbConnect from "@/lib/dbConnect"; // we'll create this small helper

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

async function getPhoneFromToken(request) {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.phone;
  } catch {
    return null;
  }
}

// GET profile data
export async function GET(request) {
  await dbConnect();
  const phone = await getPhoneFromToken(request);

  if (!phone) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await Donor.findOne({ contactNumber: phone });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user);
}

// PUT to update availability
export async function PUT(request) {
  await dbConnect();
  const phone = await getPhoneFromToken(request);

  if (!phone) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { available } = await request.json();
  const user = await Donor.findOneAndUpdate(
    { contactNumber: phone },
    { available },
    { new: true }
  );

  return NextResponse.json(user);
}
