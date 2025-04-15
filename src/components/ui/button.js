import React from "react";

export function Button({ children, className = "", variant = "default", ...props }) {
  const baseStyle =
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants = {
    default: "bg-white text-black hover:bg-gray-200 focus:ring-black",
    outline: "border border-white text-white hover:bg-white hover:text-black focus:ring-white",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
