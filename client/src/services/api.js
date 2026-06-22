import axios from "axios";

const api = axios.create({
    baseURL: "https://taskflow-api-orqj.onrender.com/api",
});

export default api;