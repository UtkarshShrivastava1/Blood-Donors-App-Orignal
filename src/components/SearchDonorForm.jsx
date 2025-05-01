"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiMapPin, FiDroplet, FiMail } from "react-icons/fi";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import stateDistricts from "@/utils/stateDistricts";

export default function SearchDonorForm({
  onSearchComplete,
  setIsLoading,
  isLoading,
}) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [donorCity, setDonorCity] = useState(""); // This is the new state for selected city
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedPincode, setSelectedPincode] = useState("");
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState(null);

  const clearForm = () => {
    setSelectedState("");
    setSelectedDistrict("");
    setSelectedCity("");
    setDonorCity("");
    setSelectedBloodGroup("");
    setSelectedPincode("");
    setCities([]);
    onSearchComplete([]); // Clear results
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

  const handleSearch = async () => {
    if (!selectedState || !selectedBloodGroup) {
      toast.error("Please select required search criteria");
      return;
    }

    if (typeof setIsLoading === "function") setIsLoading(true);

    try {
      const res = await axios.get("/api/donors", {
        params: {
          state: selectedState,
          district: selectedDistrict || undefined,
          city: selectedCity || undefined,
          bloodGroup: selectedBloodGroup,
        },
      });

      if (res.data.success && res.data.donors?.length > 0) {
        onSearchComplete(res.data.donors);
      } else {
        toast.info("No donors found matching your criteria");
        onSearchComplete([]);
      }
    } catch (err) {
      console.error("Search error:", err);
      toast.error("Failed to fetch donors. Please try again.");
      onSearchComplete([]);
    } finally {
      if (typeof setIsLoading === "function") setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 space-y-6 w-full max-w-4xl border border-gray-100"
    >
      <h2 className="text-3xl font-bold text-center text-rose-600 mb-6">
        Find Blood Donors / रक्तदाता खोजें
      </h2>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* State */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            State (राज्य)
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none z-10" />
            <select
              className="appearance-none w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg 
          bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 
          focus:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed 
          text-gray-900 transition-colors duration-200"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">Select State / राज्य चुनें</option>
              {Object.keys(stateDistricts).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* District */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            District (जिला)
          </label>
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none z-10" />
            <select
              className="appearance-none w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg 
          bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 
          focus:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed 
          text-gray-900 transition-colors duration-200"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
            >
              <option value="">Select District / जिला चुनें</option>
              {districts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blood Group */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Blood Group (रक्त समूह)
          </label>
          <div className="relative">
            <FiDroplet className="absolute left-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none z-10" />
            <select
              className="appearance-none w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg 
          bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 
          focus:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed 
          text-gray-900 transition-colors duration-200"
              value={selectedBloodGroup}
              onChange={(e) => setSelectedBloodGroup(e.target.value)}
            >
              <option value="">Select Blood Group / रक्त समूह चुनें</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                (group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                )
              )}
            </select>
          </div>
        </div>
      </div>

      {/* City/Area */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          City/Area (शहर/क्षेत्र)
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
            className="appearance-none w-full pl-12 pr-4 py-2.5 border border-gray-200 rounded-lg 
        bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-rose-500 
        focus:border-rose-500 disabled:opacity-50 disabled:cursor-not-allowed 
        text-gray-900 transition-colors duration-200"
            disabled={!selectedState || citiesLoading}
          >
            <option value="">Select City / शहर चुनें</option>
            {cities.length === 0 && !citiesLoading && (
              <option disabled>
                No cities available / कोई शहर उपलब्ध नहीं
              </option>
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
          <p className="text-gray-500 mt-1">
            Loading cities... / शहर लोड हो रहे हैं...
          </p>
        )}
        {citiesError && (
          <p className="text-red-500 mt-1">
            Error loading cities / शहर लोड करने में त्रुटि
          </p>
        )}
      </div>

      {/* Pincode */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Pincode (पिनकोड) [Optional/वैकल्पिक]
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Enter Pincode / पिनकोड दर्ज करें (optional)"
            value={selectedPincode}
            onChange={(e) => setSelectedPincode(e.target.value)}
          />
        </div>
      </div>

      {/* Submit and Clear Buttons */}
      <div className="flex gap-4">
        <button
          className="flex-1 bg-rose-500 hover:bg-rose-600 text-white py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-opacity-50"
          onClick={handleSearch}
          disabled={isLoading}
        >
          {isLoading ? (
            <ClipLoader size={20} color="white" />
          ) : (
            <span>Search Donors / रक्तदाता खोजें</span>
          )}
        </button>

        {/* Only show clear button if any field has value */}
        {(selectedState ||
          selectedDistrict ||
          selectedCity ||
          selectedBloodGroup ||
          selectedPincode) && (
          <button
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition-colors"
            onClick={clearForm}
            type="button"
          >
            Clear Form
          </button>
        )}
      </div>
    </motion.div>
  );
}
