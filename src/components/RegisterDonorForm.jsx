"use client";
import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { FiSearch, FiMapPin, FiDroplet, FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import axios from "axios";
import stateDistricts from "@/utils/stateDistricts"; // Adjust path as needed
export default function DonorForm() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);
  const [selectedCity, setSelectedCity] = useState("");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorAge, setDonorAge] = useState("");
  const [donorGender, setDonorGender] = useState("");
  const [donorAddress, setDonorAddress] = useState("");
  const [donorCity, setDonorCity] = useState("");
  const [donorPincode, setDonorPincode] = useState("");
  const [donorConsent, setDonorConsent] = useState(false);
  const [donorLastDonated, setDonorLastDonated] = useState("");
  const [donorFormStatus, setDonorFormStatus] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const clearForm = () => {
    setDonorName("");
    setDonorPhone("");
    setDonorEmail("");
    setSelectedBloodGroup("");
    setSelectedState("");
    setSelectedDistrict("");
    setDonorAge("");
    setDonorGender("");
    setDonorAddress("");
    setDonorCity("");
    setDonorPincode("");
    setDonorLastDonated("");
    setDonorConsent(false);
  };
  useEffect(() => {
    setDistricts(stateDistricts[selectedState] || []);
    setSelectedDistrict(""); // Reset district when state changes
    setSelectedCity("");
    setDonorCity(""); // Reset donor city when state changes

    if (selectedState) {
      fetchCitiesForState(selectedState);
    } else {
      setCities([]);
    }
  }, [selectedState]);

  useEffect(() => {
    if (!selectedState) {
      setCities([]);
      setSelectedCity("");
      setDonorCity("");
    }
  }, [selectedDistrict]);

  const fetchCitiesForState = async (state) => {
    try {
      setCitiesLoading(true);
      setCitiesError(null);

      const response = await axios.get("/api/cities", {
        params: { state },
      });

      if (response.data && Array.isArray(response.data.cities)) {
        setCities(response.data.cities);
      } else {
        setCities([]);
        setCitiesError("No cities found");
      }
    } catch (error) {
      console.error("Failed to fetch cities:", error);
      setCitiesError("Failed to fetch cities");
      setCities([]);
    } finally {
      setCitiesLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!donorName.trim()) {
      newErrors.name = "Name is required";
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!donorPhone || !phoneRegex.test(donorPhone)) {
      newErrors.phone = "Valid 10-digit contact number required";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!donorEmail) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(donorEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Blood group validation
    if (!selectedBloodGroup) {
      newErrors.bloodGroup = "Blood group is required";
    }

    // Location validation
    if (!selectedState) {
      newErrors.state = "State is required";
    }
    if (!selectedDistrict) {
      newErrors.district = "District is required";
    }

    // Consent validation
    if (!donorConsent) {
      newErrors.consent = "You must agree to the terms";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form first
      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        toast.error("Please fill in all required fields correctly");
        setLoading(false);
        return;
      }

      // Check for duplicate phone and email
      try {
        const checkDuplicate = await axios.post("/api/check-duplicate", {
          email: donorEmail.toLowerCase().trim(),
          phone: donorPhone,
        });

        if (checkDuplicate.data.exists) {
          const { field, message } = checkDuplicate.data;
          setErrors((prev) => ({
            ...prev,
            [field]: message,
          }));
          toast.error(message);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Duplicate check failed:", error);
        toast.error("Failed to verify registration details");
        setLoading(false);
        return;
      }

      // If no duplicates, proceed with registration
      const formData = {
        name: donorName.trim(),
        bloodGroup: selectedBloodGroup,
        gender: donorGender,
        age: donorAge,
        contactNumber: donorPhone,
        email: donorEmail.toLowerCase().trim(),
        state: selectedState,
        district: selectedDistrict,
        city: donorCity,
        address: donorAddress?.trim(),
        pincode: donorPincode?.trim(),
        available: true,
        lastDonated: donorLastDonated || null,
        consent: donorConsent,
      };

      const response = await axios.post("/api/register", formData);

      // Check the exact response structure
      console.log("Registration response:", response.data);

      // Update condition to check for successful registration
      if (response.data && (response.data.success || response.status === 201)) {
        // Show success toast
        toast.success("Registration successful! Redirecting to login...", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
        });

        // Clear form and errors
        clearForm();
        setErrors({});

        // Redirect after toast shows
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(response.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration Error:", err);
      toast.error(err.response?.data?.message || "Failed to register donor", {
        position: "bottom-right",
        autoClose: 5000,
      });

      setErrors((prev) => ({
        ...prev,
        submit: err.response?.data?.message || "Registration failed",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
          Donor Registration Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-12 text-gray-800">
          {/* Personal Info */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label
                  htmlFor="donorName"
                  className="text-sm font-medium text-gray-700"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="donorName"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter full name"
                  required
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="donorPhone"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Number *
                </label>
                <input
                  type="tel"
                  id="donorPhone"
                  value={donorPhone}
                  onChange={(e) => setDonorPhone(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter phone number"
                  required
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="donorEmail"
                  className="text-sm font-medium text-gray-700"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="donorEmail"
                  value={donorEmail}
                  onChange={(e) => setDonorEmail(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-lg border text-sm placeholder-gray-400 
      focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 
      transition ${errors.email ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Enter email address"
                  required
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Age */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  min="18"
                  max="65"
                  value={donorAge}
                  onChange={(e) => setDonorAge(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder="Enter age"
                />
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  value={donorGender}
                  onChange={(e) => setDonorGender(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                >
                  <option value="">Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
          </section>

          {/* Location Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Location Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* State */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  State *
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  required
                >
                  <option value="">Select State</option>
                  {Object.keys(stateDistricts).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-sm text-red-500">{errors.state}</p>
                )}
              </div>

              {/* District */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  District *
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  disabled={!selectedState}
                  required
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-sm text-red-500">{errors.district}</p>
                )}
              </div>

              {/* City */}
              {/* -- Keep your current city field exactly same */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  City/Area
                  {citiesLoading && <ClipLoader size={12} className="ml-2" />}
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none z-10" />
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      setSelectedCity(e.target.value);
                      setDonorCity(e.target.value);
                    }}
                    className="appearance-none w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed text-gray-900 transition-colors duration-200"
                    disabled={!selectedState || citiesLoading}
                  >
                    <option value="">Select City</option>
                    {cities.length === 0 && !citiesLoading && (
                      <option disabled>No cities available</option>
                    )}
                    {cities.map((city, index) => {
                      try {
                        const decodedCity = decodeURIComponent(city);
                        return (
                          <option key={index} value={decodedCity}>
                            {decodedCity}
                          </option>
                        );
                      } catch (error) {
                        return (
                          <option key={index} value={city}>
                            {city} (Invalid encoding)
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                {citiesLoading && !citiesError && (
                  <p className="text-gray-500 text-xs">Loading cities...</p>
                )}
                {citiesError && (
                  <p className="text-red-500 text-xs">{citiesError}</p>
                )}
              </div>

              {/* Full Address */}
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Full Address
                </label>
                <textarea
                  rows={3}
                  value={donorAddress}
                  onChange={(e) => setDonorAddress(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder="House No, Street, Locality"
                />
              </div>

              {/* Pincode */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  value={donorPincode}
                  onChange={(e) => setDonorPincode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  placeholder="Enter pincode"
                />
              </div>
            </div>
          </section>

          {/* Blood Details */}
          <section>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              Blood Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Blood Group */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Blood Group *
                </label>
                <select
                  value={selectedBloodGroup}
                  onChange={(e) => setSelectedBloodGroup(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border text-sm bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                  required
                >
                  <option value="">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                    (group) => (
                      <option key={group} value={group}>
                        {group}
                      </option>
                    )
                  )}
                </select>
                {errors.bloodGroup && (
                  <p className="text-sm text-red-500">{errors.bloodGroup}</p>
                )}
              </div>

              {/* Last Donated */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Last Donated
                </label>
                <input
                  type="date"
                  value={donorLastDonated}
                  onChange={(e) => setDonorLastDonated(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition"
                />
              </div>
            </div>
          </section>

          {/* Consent */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="donorConsent"
              checked={donorConsent}
              onChange={(e) => setDonorConsent(e.target.checked)}
              required
              className="mt-1 h-5 w-5 text-rose-600"
            />
            <label
              htmlFor="donorConsent"
              className="text-sm text-gray-700 font-medium"
            >
              I agree to the terms and conditions.
            </label>
            {errors.consent && (
              <p className="text-sm text-red-500">{errors.consent}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-rose-600 text-white px-8 py-3 rounded-full font-semibold transition ${
                loading ? "opacity-50 cursor-not-allowed" : "hover:bg-rose-700"
              }`}
            >
              {loading ? "Registering..." : "Register Donor"}
            </button>
          </div>

          {/* Status */}
          {donorFormStatus && (
            <div className="mt-6 text-center">
              <p
                className={`text-sm font-medium ${
                  donorFormStatus.startsWith("✅")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {donorFormStatus}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
