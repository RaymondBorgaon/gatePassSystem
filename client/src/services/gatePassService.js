import api from "../api/axios";

/* =========================================
   CREATE GATE PASS
========================================= */

export const createGatePass = async (data) => {
  const response = await api.post("/gate-passes", data);

  return response.data;
};


/* =========================================
   GET ALL GATE PASSES
========================================= */

export const getAllGatePasses = async (params = {}) => {
  const response = await api.get("/gate-passes", {
    params,
  });

  return response.data;
};


/* =========================================
   GET SINGLE GATE PASS
========================================= */

export const getGatePassById = async (id) => {
  const response = await api.get(`/gate-passes/${id}`);

  return response.data;
};


/* =========================================
   UPDATE GATE PASS
========================================= */

export const updateGatePass = async (id, data) => {
  const response = await api.patch(
    `/gate-passes/${id}`,
    data
  );

  return response.data;
};


/* =========================================
   UPDATE GATE PASS STATUS
========================================= */

export const updateGatePassStatus = async (
  id,
  status
) => {
  const response = await api.patch(
    `/gate-passes/${id}/status`,
    {
      status,
    }
  );

  return response.data;
};


/* =========================================
   DELETE GATE PASS
========================================= */

export const deleteGatePass = async (id) => {
  const response = await api.delete(
    `/gate-passes/${id}`
  );

  return response.data;
};