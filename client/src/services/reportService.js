import api from "../api/axios";

/* =========================================
   GET REPORT SUMMARY
========================================= */

export const getReportSummary = async (params) => {
  const response = await api.get(
    "/reports/summary",
    {
      params,
    }
  );

  return response.data;
};