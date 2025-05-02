import { sortDonorsByPriority } from "@/utils/donorPriority";
import { useMemo } from "react";

export default function DonorTable({ donors, className = "" }) {
  if (!donors || donors.length === 0) return null;

  // Debug log
  console.log("Donor data:", donors[0]); // Check first donor's data structure

  // Sort donors by priority
  const sortedDonors = useMemo(() => sortDonorsByPriority(donors), [donors]);

  return (
    <div className={`mt-8 px-4 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Donors Found: {donors.length}
      </h3>

      {/* Mobile View - Compact Card Layout */}
      <div className="md:hidden grid grid-cols-1 gap-3">
        {sortedDonors.map((donor, i) => (
          <div
            key={i}
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-100"
          >
            {/* Primary Info Row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-rose-600 w-10 text-center border-r border-gray-200 pr-2">
                  {donor.bloodGroup}
                </span>
                <div className="flex flex-col">
                  <h4 className="text-base font-medium text-gray-900 truncate">
                    {donor.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{donor.gender || "N/A"}</span>
                    <span>•</span>
                    <span>{donor.age || "N/A"} yrs</span>
                  </div>
                </div>
              </div>
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  donor.available
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {donor.available ? "Available" : "Unavailable"}
              </span>
            </div>

            {/* Contact Button */}
            {donor.contactNumber && (
              <button
                onClick={() =>
                  (window.location.href = `tel:${donor.contactNumber}`)
                }
                className="w-full mt-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
              >
                <span className="text-sm">📞</span>
                <span className="font-medium">Call Donor</span>
                <span className="text-sm opacity-75">
                  ({donor.contactNumber})
                </span>
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View - Table Layout */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full table-auto bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Blood Group
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Contact Number
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
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                Email
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDonors.map((donor, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">
                  {donor.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {donor.bloodGroup}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {donor.contactNumber && (
                    <a
                      href={`tel:${donor.contactNumber}`}
                      className="text-blue-500 hover:underline"
                    >
                      {donor.contactNumber}
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {donor.gender || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {donor.age || "N/A"}
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
                <td className="px-6 py-4 text-sm text-gray-500">
                  {donor.email && (
                    <a
                      href={`mailto:${donor.email}`}
                      className="text-blue-500 hover:underline"
                    >
                      {donor.email}
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
