"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount and when path changes
  useEffect(() => {
    checkLoginStatus();
  }, [pathname]);

  const checkLoginStatus = async () => {
    try {
      const res = await axios.get("/api/user", { withCredentials: true });
      setIsLoggedIn(!!res.data);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/logout", {}, { withCredentials: true });
      setIsLoggedIn(false);
      toast.success("Logged out successfully");
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");
    }
  };

  // Navigation Items including the new About Us and Contact links
  const navItems = [
    { href: "/", label: "Find Donors" },
    { href: "/register", label: "Register as Donor" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="bg-[#0d173b] border-b border-white/10 shadow-sm sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 text-2xl font-bold text-rose-500">
            <Link href="/" className="flex items-center gap-2">
              🩸 <span>MySaviour</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-rose-600 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                    pathname === "/profile"
                      ? "bg-white text-rose-600"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <FiUser className="text-lg" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 bg-rose-500 hover:bg-rose-600 text-white"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                  pathname === "/login"
                    ? "bg-white text-rose-600"
                    : "bg-rose-500 hover:bg-rose-600 text-white"
                }`}
              >
                <FiLogIn className="text-lg" />
                Donor Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
