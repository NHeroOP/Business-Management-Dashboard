import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const businessId = localStorage.getItem("businessId");

  if (businessId) {
    config.headers["x-business-id"] = businessId;
  }

  return config;
});