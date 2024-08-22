import React from "react";

const SpinLoading = ({ size = 60, className }) => {
  return (
    <span
      className={
        `flex border-2 border-[#ff9100] border-l-transparent border-b-[#ff9100] rounded-full animate-spin ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    ></span>
  );
};

export default SpinLoading;