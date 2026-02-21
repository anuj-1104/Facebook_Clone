import axios from "axios";

const token = localStorage.getItem("token");
if (!token) {
  console.error("token not found");
}

const create_api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default create_api;
