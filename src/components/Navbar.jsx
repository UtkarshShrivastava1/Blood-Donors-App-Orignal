"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Find Donors" },
    { href: "/register", label: "Register as Donor" },
  ];

  return (
    <nav className="bg-[#0d173b] border-b border-white/10 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-red-600 text-2xl font-bold flex items-center gap-2"
            >
              🩸 <span>MySaviour</span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden sm:flex sm:items-center sm:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  pathname === item.href
                    ? "bg-red-100 text-red-700"
                    : "text-gray-700 hover:text-red-600 hover:bg-red-50"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Donor Login Button */}
            <Link
              href="/login"
              className={`text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 ${
                pathname === "/login"
                  ? "bg-red-700 text-white"
                  : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Donor Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
