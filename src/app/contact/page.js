"use client";

import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center flex flex-col items-center gap-8"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text">
          Contact Us
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Have questions, suggestions, or want to collaborate? We’d love to hear
          from you.
        </p>

        <div className="bg-white w-full rounded-xl shadow-lg p-8 space-y-6 text-left">
          <div className="flex items-center gap-4">
            <FiMail className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">contact@zager.in</span>
          </div>

          <div className="flex items-center gap-4">
            <FiPhone className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">+91-9407655717</span>
          </div>

          <div className="flex items-center gap-4">
            <FiMapPin className="text-red-600 text-xl" />
            <span className="text-gray-700 font-medium">
              Startup Enclave, CSIT Campus, Shivaji Nagar, Balod Road, Durg,
              Chhattisgarh 491001
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
