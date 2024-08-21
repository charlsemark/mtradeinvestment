import Cookies from "js-cookie";

export const updatePlan = async (planId, formData) => {
  const token = Cookies.get('token');
  try {
    const response = await fetch(`/api/admin/update-plan/?plan_id=${planId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error in updatePlan service:", error);
    return { success: false, error: "Failed to update plan." };
  }
};
