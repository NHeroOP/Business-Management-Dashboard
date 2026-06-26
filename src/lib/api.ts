import { useBusinessStore } from "@/store/business";
import axios from "axios";


let accessToken: string | null = null;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1/",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const { currBusiness } = useBusinessStore.getState();

    if (currBusiness) {
    config.headers["x-business-id"] = currBusiness._id;
  }

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const response = await axios.post(
          `${api.defaults.baseURL}auth/refresh-token`, 
          {}, 
          { withCredentials: true }
        );

        const newAccessToken = response.data.accessToken;
        setAccessToken(newAccessToken);

        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        
        return api(originalRequest);
      }
      catch (refreshError) {
        setAccessToken(null);
        localStorage.removeItem("businessId");
        
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
}
);