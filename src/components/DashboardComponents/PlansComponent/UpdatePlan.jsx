"use client";

import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { updatePlan } from "@/services/updatePlan";
import { GlobalContext } from "@/context";

const UpdatePlanModal = ({ plan, onClose }) => {
  const { setComponentLevelLoader } = useContext(GlobalContext);
  const [formData, setFormData] = useState(plan || {});

    // Log the plan and plan.id for debugging
    console.log("Plan prop:", plan);
    console.log("Plan ID:", plan?._id);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setComponentLevelLoader({ loading: true, id: plan._id });
    try {
      const response = await updatePlan(plan?._id, formData); // Ensure this is awaited
      if (response?.success) {
        toast.success("Plan updated!", {
          position: "top-right",
        });
      } else {
        toast.error(response?.error || "Error updating plan", {
          position: "top-right",
        });
      }
    } catch (error) {
      console.error("Error updating plan:", error);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-right",
      });
    } finally {
      setComponentLevelLoader({ loading: false, id: "" });
      onClose(); // Close modal after operation is complete
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Update Plan</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="planName"
              className="block text-sm font-medium text-gray-700"
            >
              Plan Name
            </label>
            <input
              type="text"
              id="planName"
              name="planName"
              value={formData.planName || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="minPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Min. Investment
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={formData.minPrice || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="maxPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Max. Investment
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              value={formData.maxPrice || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="roiPeriod"
              className="block text-sm font-medium text-gray-700"
            >
              Profit Period
            </label>
            <input
              type="text"
              id="roiPeriod"
              name="roiPeriod"
              value={formData.roiPeriod || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="roi"
              className="block text-sm font-medium text-gray-700"
            >
              Profit
            </label>
            <input
              type="number"
              id="roi"
              name="roi"
              value={formData.roi || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="period"
              className="block text-sm font-medium text-gray-700"
            >
              Duration (Months)
            </label>
            <input
              type="number"
              id="period"
              name="period"
              value={formData.period || ""}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="inline-block bg-[#ff9100] py-2 px-4 text-base font-medium tracking-wide text-white rounded-md"
          >
            Update Plan
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-block ml-4 py-2 px-4 text-base font-medium tracking-wide text-white rounded-md bg-gray-500"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlanModal;
