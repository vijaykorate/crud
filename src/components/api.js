// src/components/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
