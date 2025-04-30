"use client";

import { motion } from "framer-motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-left space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text text-center">
          Privacy Policy
        </h1>

        <p className="text-gray-700 text-lg">
          At <strong>MySaviour</strong>, your privacy is our priority. We are
          committed to protecting your personal data and being transparent about
          how we use it.
        </p>

        <div className="space-y-4 text-gray-600 text-base leading-relaxed">
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              1. Information We Collect
            </h2>
            <p>
              We collect personal details such as name, contact number, blood
              group, and location to connect donors with those in need. This
              data is used strictly for service functionality.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              2. How We Use Your Data
            </h2>
            <p>
              Your data helps recipients find suitable donors nearby. We never
              sell or share your personal information with third parties for
              marketing.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              3. Data Security
            </h2>
            <p>
              We implement robust security practices to protect your
              information. Access is limited only to authorized personnel.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              4. Your Control
            </h2>
            <p>
              You can edit or delete your donor profile anytime. If you wish to
              remove your data entirely, contact us directly at{" "}
              <strong>support@mysaviour.in</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              5. Updates to Policy
            </h2>
            <p>
              This policy may be updated occasionally. We&apos;ll notify you of
              any significant changes via our platform or email.
            </p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Last updated: April 2025
        </p>
      </motion.div>
    </div>
  );
}
