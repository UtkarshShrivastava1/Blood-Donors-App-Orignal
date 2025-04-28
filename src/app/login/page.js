"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("enter-email"); // 'enter-email' or 'enter-otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSendOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/send-otp", {
        email,
      });
      if (res.data.success) {
        setStep("enter-otp");
      } else {
        setError(res.data.message || "Failed to send OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp() {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/auth/verify-otp", {
        email,
        otp,
      });
      if (res.data.success) {
        window.location.href = "/profile";
      } else {
        setError(res.data.message || "Failed to verify OTP");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600 p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-indigo-700">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 text-red-800 p-3 mb-6 rounded text-center font-semibold">
            {error}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-gray-800 mb-2 font-medium">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {step === "enter-otp" && (
          <div className="mb-6">
            <label className="block text-gray-800 mb-2 font-medium">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
            />
          </div>
        )}

        <button
          onClick={step === "enter-email" ? handleSendOtp : handleVerifyOtp}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 active:bg-indigo-800 font-semibold transition duration-300"
        >
          {loading
            ? "Please wait..."
            : step === "enter-email"
            ? "Send OTP"
            : "Verify OTP"}
        </button>
      </div>
    </div>
  );
}
