import mongoose from "mongoose";

const DonorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    bloodGroup: {
      type: String,
      required: true,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
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
      unique: true, // 💡 ensure uniqueness
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true, // 💡 important for login
      sparse: true, // allows multiple docs with null email
    },
    address: { type: String },
    country: {
      type: String,
      default: "India",
    },
    state: { type: String },
    district: { type: String },
    city: { type: String },
    pincode: { type: String },
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
    notes: String,
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // ✅ adds createdAt, updatedAt automatically
);

console.log("✅ Donor model loaded");

export default mongoose.models.Donor || mongoose.model("Donor", DonorSchema);
