"use client";
import { useState } from "react";

export default function DonorForm() {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    bloodGroup: "",
    contactNumber: "",
    email: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    lastDonated: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("/api/donors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage("Donor registered successfully!");
        setFormData({
          name: "",
          gender: "",
          age: "",
          bloodGroup: "",
          contactNumber: "",
          email: "",
          state: "",
          district: "",
          city: "",
          pincode: "",
          lastDonated: "",
        });
      } else {
        const data = await res.json();
        setMessage(data.error || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      setMessage("Server error");
    }

    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-4 space-y-4 bg-white shadow rounded"
    >
      <h2 className="text-2xl font-bold">Register as Donor</h2>

      {[
        "name",
        "age",
        "bloodGroup",
        "contactNumber",
        "email",
        "state",
        "district",
        "city",
        "pincode",
        "lastDonated",
      ].map((field) => (
        <input
          key={field}
          type={
            field === "lastDonated"
              ? "date"
              : field === "age"
              ? "number"
              : "text"
          }
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      ))}

      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
      >
        {submitting ? "Registering..." : "Register Donor"}
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
