"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHeart } from "react-icons/fi";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl text-center flex flex-col items-center gap-8"
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
          About MySaviour
        </h1>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          MySaviour is a community-driven platform built to bridge the gap
          between blood donors and those in urgent need. With a simple,
          efficient, and mobile-friendly system, we connect verified donors with
          recipients based on location, availability, and donation history.
        </p>

        <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
          Whether you&apos;re someone looking to save lives or someone in search
          of help, MySaviour ensures that every drop reaches the right
          place—quickly and safely.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/register"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all flex items-center gap-2 group"
          >
            <FiHeart className="group-hover:scale-110 transition-transform" />
            <span>Join as a Donor</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
