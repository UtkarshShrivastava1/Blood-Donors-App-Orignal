"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiLogIn, FiLogOut, FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const navItems = [
    { href: "/", label: "Find Donors" },
    { href: "/register", label: "Register as Donor" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleSidebar}
            className="sm:hidden p-2 rounded-md hover:bg-white/10"
          >
            {isSidebarOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
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

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-[#0d173b] transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out sm:hidden shadow-xl z-50`}
      >
        <div className="p-6 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={closeSidebar}
              className="p-2 rounded-md hover:bg-white/10"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeSidebar}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-all duration-200 ${
                  pathname === item.href
                    ? "bg-rose-600 text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Mobile Auth Buttons */}
            {isLoggedIn ? (
              <div className="space-y-2 pt-4 border-t border-white/10">
                <Link
                  href="/profile"
                  onClick={closeSidebar}
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
                  onClick={() => {
                    handleLogout();
                    closeSidebar();
                  }}
                  className="w-full flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 bg-rose-500 hover:bg-rose-600 text-white"
                >
                  <FiLogOut className="text-lg" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={closeSidebar}
                className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-md transition-all duration-200 mt-4 ${
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

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
          onClick={closeSidebar}
        />
      )}
    </nav>
  );
}
