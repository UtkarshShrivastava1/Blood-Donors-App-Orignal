import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect"; // Adjust path if needed
import Donor from "@/models/Donor"; // Adjust path as needed

// Function to handle GET requests
export async function GET(request) {
  try {
    // Ensure database connection
    await dbConnect();

    // Extract query parameters from the request URL
    const url = new URL(request.url);
    const state = url.searchParams.get("state");
    const district = url.searchParams.get("district");
    const bloodGroup = url.searchParams.get("bloodGroup");

    // Construct filter object for database query
    const filter = {};

    if (state) filter.state = state;
    if (district) filter.district = district;
    if (bloodGroup) filter.bloodGroup = bloodGroup;

    // Query the Donor collection based on the provided filters
    const donors = await Donor.find(filter);

    // If no donors are found, return a 404 response with a message
    if (donors.length === 0) {
      return NextResponse.json({ message: "No donors found" }, { status: 404 });
    }

    // Return the found donors as a JSON response
    return NextResponse.json(donors, { status: 200 });
  } catch (error) {
    console.error("Error searching donors:", error);
    // Return a 500 error response if something goes wrong
    return NextResponse.json(
      { error: "Failed to search donors" },
      { status: 500 }
    );
  }
}
