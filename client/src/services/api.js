import axios from "axios";

const api = axios.create({
    baseURL: "https://taskflow-api-orqj.onrender.com",
});

export default api;