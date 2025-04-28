import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

export function middleware(request) {
  const token = request.cookies.get("token")?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return NextResponse.next(); // token valid, allow access
  } catch (error) {
    console.error("JWT Error:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Protect only profile route
export const config = {
  matcher: ["/profile/:path*"],
};
