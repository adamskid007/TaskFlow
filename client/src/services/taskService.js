import api from "./api";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers:{ Authorization: `Bearer ${token}`,},
    };
};

export const getTasks = async () => {
    const response = await api.get("/tasks",getAuthHeader()); return response.data;};

export const createTask = async (taskData) => {
    const response = await api.post("/tasks", taskData, getAuthHeader());
    return response.data;
};

export const deleteTask = async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`, getAuthHeader());
    return response.data;
};

export const updateTask = async ( taskId, updates) => {
    const response = await api.put(`/tasks/${taskId}`,updates,getAuthHeader());

    return response.data;
};

