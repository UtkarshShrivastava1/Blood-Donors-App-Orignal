"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchDonorForm from "@/components/SearchDonorForm";
import DonorTable from "@/components/DonorTable";
import ErrorBoundary from "@/components/ErrorBoundary";
import PropTypes from "prop-types";

export default function Home() {
  const [donors, setDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const handleSearchComplete = (results) => {
    try {
      setDonors(results);
      // Automatically minimize form when results are found
      if (results.length > 0) {
        setIsFormExpanded(false);
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }
    } catch (err) {
      setError(err.message);
      console.error("Search error:", err);
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
        <ToastContainer position="top-right" />

        {/* Hero Section - Make it responsive */}
        {/* ...existing hero section code... */}

        {/* Search Form Section */}
        <motion.div
          className="relative px-4 sm:px-6 pb-6"
          animate={{ height: isFormExpanded ? "auto" : "min-content" }}
        >
          {/* Toggle Button - Show when results exist */}
          {donors.length > 0 && (
            <button
              onClick={() => setIsFormExpanded(!isFormExpanded)}
              className="absolute right-4 top-2 z-10 flex items-center gap-2 p-2 rounded-lg bg-rose-100 text-rose-600 hover:bg-rose-200 transition-colors"
            >
              <span className="text-sm font-medium mr-1">
                {isFormExpanded ? "Minimize Search" : "Modify Search"}
              </span>
              {isFormExpanded ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          )}

          {/* Form Container */}
          <AnimatePresence mode="wait">
            {(isFormExpanded || donors.length === 0) && (
              <motion.div
                key="search-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex justify-center"
              >
                <SearchDonorForm
                  onSearchComplete={handleSearchComplete}
                  setIsLoading={setIsLoading}
                  isLoading={isLoading}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Donor Results Table */}
        <div
          ref={resultsRef}
          className="max-w-4xl mx-auto px-4 sm:px-6 pb-12 transition-all duration-300"
        >
          <DonorTable
            donors={donors}
            className={donors.length > 0 ? "mt-4" : "mt-0"}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

Home.propTypes = {
  donors: PropTypes.array,
  isLoading: PropTypes.bool,
  isFormExpanded: PropTypes.bool,
};
