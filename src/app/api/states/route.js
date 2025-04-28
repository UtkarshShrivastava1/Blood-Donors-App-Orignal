// src/app/api/states/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Sample data - replace this with your actual logic to fetch states (e.g., from a database or an external API)
    const states = [
      { id: 1, name: "Andhra Pradesh" },
      { id: 2, name: "Bihar" },
      { id: 3, name: "Chhattisgarh" },
      { id: 4, name: "Goa" },
      { id: 5, name: "Haryana" },
      // Add more states as needed
    ];

    return NextResponse.json(states, { status: 200 });
  } catch (error) {
    console.error("Error fetching states:", error);
    return NextResponse.json(
      { error: "Failed to fetch states" },
      { status: 500 }
    );
  }
}
