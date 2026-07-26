import axios from "axios";

const authApi = axios.create({
    baseURL: "https://cookpad-backend.onrender.com/api",
});

export const loginUser = (data) => {
    return authApi.post("/login/", data);
};

export const registerUser = (data) => {
    return authApi.post("/register/", data);
};