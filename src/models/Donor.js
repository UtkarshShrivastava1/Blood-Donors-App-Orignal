// src/models/Donor.js

import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bloodGroup: {
    type: String,
    required: true,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], // Optional but useful
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  age: {
    type: Number,
    min: 18,
    max: 65,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  email: String,

  country: {
    type: String,
    default: "India",
  },
  state: String,
  district: String,
  city: String,
  pincode: String,

  available: {
    type: Boolean,
    default: true,
  },
  lastDonated: {
    type: Date,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },

  // Optional future-proof fields
  notes: String,
  verified: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);
