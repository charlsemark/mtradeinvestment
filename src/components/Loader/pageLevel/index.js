import React from "react";

const SpinLoading = ({ size = 60, className }) => {
  return (
    <span
      className={
        `flex border-2 border-[#007bff] border-l-transparent border-b-[#007bff] rounded-full animate-spin ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></span>
  );
};

export default SpinLoading;