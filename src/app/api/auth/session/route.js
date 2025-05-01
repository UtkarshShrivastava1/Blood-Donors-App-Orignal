import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json(
      {
        user: {
          email: session.user.email,
          name: session.user.name,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
