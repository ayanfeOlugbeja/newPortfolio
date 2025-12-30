import React from "react";

export default function Divider({ className = "" }) {
  return (
    <div className={`flex justify-between items-center w-full ${className}`}>
      {[...Array(40)].map((_, i) => (
        <div
          key={i}
          className={`w-px bg-gray-300 dark:bg-gray-700 ${
            i % 2 === 0 ? "h-8" : "h-4"
          }`}></div>
      ))}
    </div>
  );
}
