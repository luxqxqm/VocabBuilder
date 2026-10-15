import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;

    if (message) return message;
    if (error.response?.status === 409) return "Such email already exists";
    if (error.response?.status === 401) return "Invalid data or such word already exists";
  }

  return "Something went wrong. Please try again";
}
