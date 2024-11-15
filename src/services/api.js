import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/project/api/",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem("chatToken")}`
  }
});

export default api;

