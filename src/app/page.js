"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchDonorForm from "@/components/SearchDonorForm";

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <ToastContainer position="top-right" />

      {/* Hero Section
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center gap-6 px-6 py-12 sm:px-16"
      >
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Image
            src="/blood-drop.png"
            alt="Blood Drop Logo"
            width={100}
            height={100}
            className="drop-shadow-lg hover:drop-shadow-2xl transition-all"
          />
        </motion.div>
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text">
          MySaviour
        </h1>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl leading-relaxed">
          Connect with lifesaving blood donors in your area. Every drop counts.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/register"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all flex items-center gap-2 group"
          >
            <FiHeart className="group-hover:scale-110 transition-transform" />
            <span>Become a Donor</span>
          </Link>
        </motion.div>
      </motion.div> */}

      {/* Search Form */}
      <div className="flex justify-center px-6 pb-12">
        <SearchDonorForm
          onSearchComplete={setDonors}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>

      {/* Optional: Render donors here */}
      <div className="max-w-4xl mx-auto px-6 pb-12">
        {donors.length > 0 && (
          <div className="overflow-x-auto mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Donors Found: {donors.length}
            </h3>
            {/* Donor table */}
            <table className="min-w-full table-auto bg-white rounded shadow-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Contact Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Blood Group
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Gender
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Age
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                    Last Donated
                  </th>
                </tr>
              </thead>
              <tbody>
                {donors.map((donor, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {donor.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {/* Clickable Email */}
                      <a
                        href={`mailto:${donor.email}`}
                        className="text-blue-500 hover:underline"
                      >
                        {donor.email || "N/A"}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {/* Clickable Phone Number */}
                      <a
                        href={`tel:${donor.contactNumber}`}
                        className="text-blue-500 hover:underline"
                      >
                        {donor.contactNumber}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {donor.bloodGroup}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {donor.gender}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {donor.age}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <span
                        className={`px-3 py-1 text-xs rounded-full ${
                          donor.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {donor.available ? "Available" : "Not Available"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {donor.lastDonated
                        ? new Date(donor.lastDonated).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
