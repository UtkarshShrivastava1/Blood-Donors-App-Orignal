"use client";

import { ToastContainer } from "react-toastify";

export default function CustomToast() {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      toastStyle={{
        backgroundColor: "white",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
        borderRadius: "0.5rem",
      }}
      toastClassName={({ type }) =>
        `relative flex p-4 min-h-10 rounded-lg justify-between overflow-hidden cursor-pointer ${
          type === "success"
            ? "bg-green-50 text-green-700"
            : type === "error"
            ? "bg-red-50 text-red-700"
            : type === "warning"
            ? "bg-yellow-50 text-yellow-700"
            : "bg-blue-50 text-blue-700"
        }`
      }
    />
  );
}
