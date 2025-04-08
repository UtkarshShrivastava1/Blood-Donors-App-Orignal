"use client";

import { useState } from "react";

const initialFormState = {
  name: "",
  bloodGroup: "",
  gender: "",
  age: "",
  contactNumber: "",
  email: "",
  country: "India",
  state: "",
  district: "",
  city: "",
  pincode: "",
  available: true,
  lastDonated: "",
  notes: "",
};

export default function RegisterPage() {
  const [form, setForm] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setMessage("🎉 Donor registered successfully!");
        setForm(initialFormState);
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 sm:px-6 lg:px-8 font-sans">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-red-600">
        Register as a Blood Donor
      </h1>

      {message && (
        <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200 text-center">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 sm:grid-cols-2 gap-4"
      >
        <input
          name="name"
          placeholder="Full Name *"
          required
          value={form.name}
          onChange={handleChange}
          className="input-field"
        />

        <select
          name="bloodGroup"
          required
          value={form.bloodGroup}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Blood Group *</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="input-field"
        >
          <option value="">Select Gender</option>
          {["Male", "Female", "Other"].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="age"
          placeholder="Age (18-65)"
          min="18"
          max="65"
          value={form.age}
          onChange={handleChange}
          className="input-field"
        />

        <input
          name="contactNumber"
          placeholder="Contact Number *"
          required
          value={form.contactNumber}
          onChange={handleChange}
          className="input-field"
        />

        <input
          type="email"
          name="email"
          placeholder="Email (optional)"
          value={form.email}
          onChange={handleChange}
          className="input-field"
        />

        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="input-field"
        />

        <input
          name="district"
          placeholder="District"
          value={form.district}
          onChange={handleChange}
          className="input-field"
        />

        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="input-field"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="input-field"
        />

        <input
          type="date"
          name="lastDonated"
          value={form.lastDonated}
          onChange={handleChange}
          className="input-field"
        />

        <label className="flex items-center gap-2 col-span-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
            className="accent-red-600"
          />
          <span className="text-sm">Available for Donation</span>
        </label>

        <textarea
          name="notes"
          placeholder="Additional notes (optional)"
          value={form.notes}
          onChange={handleChange}
          rows="3"
          className="col-span-2 input-field"
        />

        <button
          type="submit"
          disabled={submitting}
          className="col-span-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition"
        >
          {submitting ? "Registering..." : "Register Donor"}
        </button>
      </form>

      {/* Extra mobile-friendly spacing */}
      <div className="h-10" />
    </div>
  );
}
