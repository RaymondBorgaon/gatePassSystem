import api from "../api/axios";

export const exportGatePasses = async (params = {}) => {

  const response = await api.get(
    "/export/gate-passes",
    {
      params,

      responseType: "blob",
    }
  );

  return response;

};