"use client";

import { motion } from "framer-motion";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 sm:px-16 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl text-left space-y-6"
      >
        <h1 className="text-4xl sm:text-6xl font-extrabold bg-gradient-to-r from-red-600 to-red-800 text-transparent bg-clip-text text-center">
          Terms of Service
        </h1>

        <p className="text-gray-700 text-lg">
          Welcome to <strong>MySaviour</strong>. By using our services, you
          agree to the following terms and conditions. Please read them
          carefully.
        </p>

        <div className="space-y-4 text-gray-600 text-base leading-relaxed">
          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using <strong>MySaviour</strong>, you agree to be
              bound by these Terms of Service. If you do not agree, do not use
              our services.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              2. Service Description
            </h2>
            <p>
              MySaviour connects blood donors with people in need of blood. We
              do not charge for the use of our platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              3. User Responsibilities
            </h2>
            <p>
              You agree to provide accurate information when registering,
              maintaining confidentiality of your login credentials, and
              complying with all applicable laws while using our platform.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              4. Prohibited Activities
            </h2>
            <p>
              You may not misuse the platform, upload harmful content, or engage
              in activities that disrupt the services provided by{" "}
              <strong>MySaviour</strong>.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              5. Data Usage
            </h2>
            <p>
              Your personal data is used only to connect you with potential
              recipients. By using the platform, you consent to the collection
              and use of your information in accordance with our Privacy Policy.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              6. Termination of Service
            </h2>
            <p>
              We may suspend or terminate your account if you violate these
              Terms of Service or engage in illegal or harmful activities. You
              may also deactivate your account at any time.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              7. Limitation of Liability
            </h2>
            <p>
              <strong>MySaviour</strong> is not responsible for any issues
              arising from the use of our platform, including but not limited to
              delays, errors, or issues with blood donation.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              8. Indemnification
            </h2>
            <p>
              You agree to indemnify and hold <strong>MySaviour</strong>{" "}
              harmless from any claims, damages, or liabilities that may arise
              from your use of the platform or violation of these terms.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-gray-800 text-lg">
              9. Governing Law
            </h2>
            <p>
              These Terms of Service are governed by the laws of India, and any
              disputes will be resolved under Indian law.
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
