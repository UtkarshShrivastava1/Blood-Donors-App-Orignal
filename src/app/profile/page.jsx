"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import stateDistricts from "@/utils/stateDistricts";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    bloodGroup: "",
    state: "",
    district: "",
    city: "",
    address: "",
    lastDonated: "",
  });

  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get("/api/user", { withCredentials: true });
        const data = res.data;

        if (!data) {
          throw new Error("No user data found");
        }

        setUser(data);
        setAvailable(data.available);
        setFormData({
          name: data.name || "",
          contactNumber: data.contactNumber || "",
          bloodGroup: data.bloodGroup || "",
          state: data.state || "",
          district: data.district || "",
          city: data.city || "",
          address: data.address || "",
          lastDonated: data.lastDonated
            ? new Date(data.lastDonated).toISOString().split("T")[0]
            : "",
        });

        if (data.state) {
          setDistricts(stateDistricts[data.state] || []);
          await fetchCitiesForState(data.state);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        setError(err.response?.data?.message || "Failed to load profile");
        toast.error("Failed to load profile. Please try again.");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  useEffect(() => {
    setDistricts(stateDistricts[formData.state] || []);
    setFormData((prev) => ({
      ...prev,
      district: "",
      city: "",
    }));

    if (formData.state) fetchCitiesForState(formData.state);
    else setCities([]);
  }, [formData.state]);

  useEffect(() => {
    if (!formData.state) {
      setCities([]);
      setFormData((prev) => ({
        ...prev,
        city: "",
      }));
    }
  }, [formData.district]);

  const fetchCitiesForState = async (state) => {
    try {
      setCitiesLoading(true);
      const response = await axios.get("/api/cities", {
        params: { state },
      });
      setCities(
        Array.isArray(response.data.cities) ? response.data.cities : []
      );
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  const handleToggleAvailability = async () => {
    try {
      const res = await axios.put(
        "/api/user",
        { available: !available },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data) {
        setAvailable(!available);
        toast.success(
          `You are now ${!available ? "available" : "unavailable"} for donation`
        );
      }
    } catch (err) {
      console.error("Toggle availability error:", err);
      toast.error("Failed to update availability status");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setSaveLoading(true);

      // Format the data with correct field name
      const formattedData = {
        ...formData,
        lastDonated: formData.lastDonated
          ? new Date(formData.lastDonated).toISOString()
          : null,
        address: formData.address?.trim() || "", // Changed from fullAddress to address
      };

      const res = await axios.put("/api/user", formattedData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.data) {
        throw new Error("No response data");
      }

      setUser(res.data);
      setFormData((prev) => ({
        ...prev,
        ...res.data,
        address: res.data.address || "", // Changed from fullAddress to address
        lastDonated: res.data.lastDonated
          ? new Date(res.data.lastDonated).toISOString().split("T")[0]
          : "",
      }));

      setEditMode(false);
      toast.success("Profile updated successfully! 🎉");
    } catch (err) {
      console.error("Update error:", err);
      handleUpdateError(err);
    } finally {
      setSaveLoading(false);
    }
  };

  const handleUpdateError = (err) => {
    if (err.response?.status === 400) {
      toast.error(err.response?.data?.message || "Invalid data provided");
    } else if (err.response?.status === 401) {
      toast.error("Session expired. Please login again");
      router.push("/login");
    } else {
      toast.error("Failed to update profile. Please try again");
    }
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        bloodGroup: user.bloodGroup || "",
        state: user.state || "",
        district: user.district || "",
        city: user.city || "",
        address: user.address || "",
        lastDonated: user.lastDonated
          ? new Date(user.lastDonated).toISOString().split("T")[0]
          : "",
      });
      setDistricts(stateDistricts[user.state] || []);
      fetchCitiesForState(user.state);
    }
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader size={50} color="#E11D48" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-blue-600 underline"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-rose-600 mb-8">
          Donor Info
        </h1>

        <div className="space-y-6">
          {/* Name */}
          <EditableField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            editMode={editMode}
          />

          {/* Phone */}
          <EditableField
            label="Phone"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            editMode={editMode}
          />

          {/* Blood Group */}
          <EditableField
            label="Blood Group"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleInputChange}
            editMode={editMode}
          />

          {/* State */}
          <DropdownField
            label="State"
            name="state"
            value={formData.state}
            options={Object.keys(stateDistricts)}
            onChange={handleInputChange}
            editMode={editMode}
          />

          {/* District */}
          <DropdownField
            label="District"
            name="district"
            value={formData.district}
            options={districts}
            onChange={handleInputChange}
            editMode={editMode}
          />

          {/* City */}
          <DropdownField
            label="City"
            name="city"
            value={formData.city}
            options={cities}
            onChange={handleInputChange}
            editMode={editMode}
            loading={citiesLoading}
          />

          {/* Availability */}
          <div className="flex justify-between items-center bg-rose-100 p-4 rounded-lg shadow-sm">
            <p className="font-medium text-gray-700">Available to Donate:</p>
            <p className="text-gray-800">{available ? "Yes" : "No"}</p>
          </div>

          {/* Last Donated */}
          <div className="flex justify-between items-start bg-rose-100 p-4 rounded-lg shadow-sm">
            <p className="font-medium text-gray-700">Last Donated:</p>
            {editMode ? (
              <input
                type="date"
                name="lastDonated"
                value={formData.lastDonated || ""}
                onChange={handleInputChange}
                className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900"
              />
            ) : (
              <p className="text-gray-800">
                {user.lastDonated
                  ? new Date(user.lastDonated).toLocaleDateString()
                  : "Not set"}
              </p>
            )}
          </div>

          {/* Address */}
          <div className="flex flex-col gap-2 bg-rose-100 p-4 rounded-lg shadow-sm">
            <p className="font-medium text-gray-700">Address:</p>
            {editMode ? (
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 text-gray-900 resize-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                placeholder="Enter your address"
              />
            ) : (
              <p className="text-gray-800 whitespace-pre-line">
                {formData.address || "Not set"}
              </p>
            )}
          </div>

          {/* Toggle Availability Button */}
          <div className="text-center mt-6">
            <button
              className={`px-6 py-3 rounded-full font-semibold transition duration-300 ${
                available
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              } text-white`}
              onClick={handleToggleAvailability}
            >
              {available ? "Mark as Unavailable" : "Mark as Available"}
            </button>
          </div>

          {/* Action Buttons */}
          {editMode && (
            <div className="flex justify-center space-x-4 mt-6">
              <button
                onClick={handleSaveChanges}
                disabled={saveLoading}
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center space-x-2 ${
                  saveLoading
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {saveLoading ? (
                  <>
                    <ClipLoader size={20} color="#ffffff" />
                    <span>Saving...</span>
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
              <button
                onClick={handleCancelEdit}
                disabled={saveLoading}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          )}
          {!editMode && (
            <div className="text-center mt-6">
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-yellow-600 text-white rounded-full"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Subcomponent: Text input or static field
const EditableField = ({ label, name, value, onChange, editMode }) => (
  <div className="flex justify-between items-center bg-rose-100 p-4 rounded-lg shadow-sm">
    <p className="font-medium text-gray-700">{label}:</p>
    {editMode ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900"
      />
    ) : (
      <p className="text-gray-800">{value || "Not set"}</p>
    )}
  </div>
);

// Subcomponent: Dropdown input or static field
const DropdownField = ({
  label,
  name,
  value,
  options,
  onChange,
  editMode,
  loading,
}) => (
  <div className="flex justify-between items-center bg-rose-100 p-4 rounded-lg shadow-sm">
    <p className="font-medium text-gray-700">{label}:</p>
    {editMode ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={loading}
        className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    ) : (
      <p className="text-gray-800">{value || "Not set"}</p>
    )}
  </div>
);
