"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/user");
        setUser(res.data);
        setAvailable(res.data.available);
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [router]);

  const handleToggleAvailability = async () => {
    try {
      await axios.put("/api/user", { available: !available });
      setAvailable(!available);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-5">Loading...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>
        <strong>Name:</strong> {user?.name || "Not set"}
      </p>
      <p>
        <strong>Phone:</strong> {user?.contactNumber}
      </p>
      <p>
        <strong>Blood Group:</strong> {user?.bloodGroup}
      </p>
      <p>
        <strong>Available to Donate:</strong> {available ? "Yes" : "No"}
      </p>

      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={handleToggleAvailability}
      >
        Toggle Availability
      </button>
    </div>
  );
}
