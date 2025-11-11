import axios from "axios";

// 1. Define the base URL of your NestJS backend
const API_BASE_URL = "http://localhost:3000"; // Default NestJS port

// 2. Create an Axios instance
const apiService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 3. (Optional) You can add interceptors here for request/response handling,
// like adding auth tokens or handling global errors.

// export default apiService;
export default apiService;
