import dbConnect from "@/lib/dbConnect";
import Donor from "@/models/Donor";

export async function POST(req) {
  try {
    // Step 1: Connect to the database
    await dbConnect();

    // Step 2: Parse incoming request
    const donorData = await req.json();

    // Step 3: Create a new donor document
    const donor = await Donor.create(donorData);

    // Step 4: Return success response
    return new Response(
      JSON.stringify({ message: "Donor registration successful!", donor }),
      { status: 201 }
    );
  } catch (err) {
    console.error("❌ Donor Registration Error:", err);
    return new Response(
      JSON.stringify({ error: "Registration failed", details: err.message }),
      { status: 500 }
    );
  }
}
