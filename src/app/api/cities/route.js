import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const state = searchParams.get("state");

  if (!state) {
    return NextResponse.json({ error: "State is required" }, { status: 400 });
  }

  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: "India",
          state: state,
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      console.error("API error:", data.msg);
      return NextResponse.json({ cities: [] });
    }

    const cities = (data.data || [])
      .map((city) => decodeURIComponent(city))
      .sort();

    return NextResponse.json({ cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    return NextResponse.json(
      { error: "Failed to fetch cities" },
      { status: 500 }
    );
  }
}
