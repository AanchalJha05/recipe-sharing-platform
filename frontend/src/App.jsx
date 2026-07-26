import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import BrowseRecipes from "./pages/BrowseRecipes";
import MyRecipes from "./pages/MyRecipes";
import RecipeDetails from "./pages/RecipeDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddRecipe from "./pages/AddRecipe";
import FavouriteRecipes from "./pages/FavouriteRecipes";
function PrivateRoute({ children }) {
    const token = localStorage.getItem("access");

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Public Routes */}

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}

                <Route
                    element={
                        <PrivateRoute>
                            <DashboardLayout />
                        </PrivateRoute>
                    }
                >
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/browse" element={<BrowseRecipes />} />
                    <Route path="/my-recipes" element={<MyRecipes />} />
                    <Route path ="/add" element={<AddRecipe/>}/>
                    <Route path="/recipe/:id" element={<RecipeDetails />} />
                    <Route path="/recipes" element ={<BrowseRecipes/>}/>
                    <Route path="/favourites" element={<FavouriteRecipes />}/>
                </Route>

            </Routes>
        </BrowserRouter>
    );
}

export default App;