import { sortDonorsByPriority } from "@/utils/donorPriority";
import { useMemo } from "react";

export default function DonorTable({ donors, className = "" }) {
  if (!donors || donors.length === 0) return null;

  // Sort donors by priority
  const sortedDonors = useMemo(() => sortDonorsByPriority(donors), [donors]);

  return (
    <div className={`mt-8 px-4 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Donors Found: {donors.length}
      </h3>

      {/* Mobile View - Card Layout */}
      <div className="md:hidden space-y-4">
        {sortedDonors.map((donor, i) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-medium text-gray-900">
                {donor.name}
              </h4>
              <span className="text-lg font-bold text-rose-600">
                {donor.bloodGroup}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-sm text-gray-600">Contact</span>
                <a
                  href={`tel:${donor.contactNumber}`}
                  className="text-sm text-blue-500"
                >
                  {donor.contactNumber}
                </a>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-sm text-gray-600">Email</span>
                <a
                  href={`mailto:${donor.email}`}
                  className="text-sm text-blue-500"
                >
                  {donor.email || "N/A"}
                </a>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-sm text-gray-600">Gender</span>
                <span className="text-sm text-gray-900">
                  {donor.gender || "N/A"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-sm text-gray-600">Age</span>
                <span className="text-sm text-gray-900">
                  {donor.age || "N/A"}
                </span>
              </div>

              <div className="flex justify-between py-1 border-b">
                <span className="text-sm text-gray-600">Last Donated</span>
                <span className="text-sm text-gray-900">
                  {donor.lastDonated
                    ? new Date(donor.lastDonated).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-gray-600">Status</span>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${
                    donor.available
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {donor.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
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
                  <a
                    href={`tel:${donor.contactNumber}`}
                    className="text-blue-500 hover:underline"
                  >
                    {donor.contactNumber}
                  </a>
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
                  <a
                    href={`mailto:${donor.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {donor.email || "N/A"}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
