import api from "../api/axios";

/* =========================================
   GET DASHBOARD STATISTICS
========================================= */

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats");

  return response.data;
};