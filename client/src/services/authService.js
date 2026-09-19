import api from "../api/axios";


/* =========================================
   LOGIN
========================================= */

export const loginUser = async (credentials) => {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
};