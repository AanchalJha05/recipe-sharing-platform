import axios from "axios";

const authApi = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
});

export const loginUser = (data) => {
    return authApi.post("/login/", data);
};

export const registerUser = (data) => {
    return authApi.post("/register/", data);
};