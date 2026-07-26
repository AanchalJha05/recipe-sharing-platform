import axios from "axios";

const api = axios.create({
    baseURL: "https://cookpad-backend.onrender.com/api",
});

// REQUEST INTERCEPTOR
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("access");
            localStorage.removeItem("refresh");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);
export const getDashboard = () =>
    api.get("/dashboard/");
export const toggleFavourite=(recipeId)=>
    api.post("/favourite/",{
        recipe_id:recipeId,
    });

export const getRecipes = () =>
    api.get("/recipes/");


export const getMyRecipes = () =>
    api.get("/recipes/?mine=true");


export const getRecipeById = (id) =>
    api.get(`/recipes/?id=${id}`);


export const createRecipe = (data) =>
    api.post("/recipes/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });


export const updateRecipe = (data) =>
    api.put("/recipes/", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });


export const deleteRecipe = (id) =>
    api.delete("/recipes/", {
        data: { id },
    });
export const getFavouriteRecipes = () => {
    return api.get("/recipes/?favourite=true");
};

export default api;