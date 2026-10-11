import api from "./api";

export const getApplications = async () => {
  const response = await api.get("/applications");
  return response.data.applications;
};

export const getApplicationById = async (id) => {
  const response = await api.get(`/applications/${id}`);
  return response;
};

export const createApplication = async (data) => {
  const response = await api.post("/applications", data);
  return response.data;
};

export const updateApplication = async (id, data) => {
  const response = await api.put(`/applications/${id}`, data);
  return response;
};

export const deleteApplication = async (id) => {
  const response = await api.delete(`/applications/${id}`);
  return response.data;
};
