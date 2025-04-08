"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/register", label: "Register" },
    { href: "/donors", label: "Find Donors" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-red-600 text-xl font-bold">
          🩸 LifeLine
        </Link>

        <div className="flex gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm sm:text-base font-medium px-3 py-1 rounded-md ${
                pathname === item.href
                  ? "bg-red-100 text-red-700"
                  : "text-gray-600 hover:text-red-600"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
