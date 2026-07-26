import "./RecipeList.css";
import { useEffect, useState } from "react";
import { Button, Form, Select, message,Input } from "antd";

import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";

import {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    toggleFavourite as toggleFavouriteApi,
} from "../services/recipeApi";

function RecipeList({ showAction = true }) {
    
    const [recipes, setRecipes] = useState([]);
    const [category, setCategory] = useState("All");
    const [search, setSearch] = useState("");

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [ingredients, setIngredients] = useState([""]);
    const [image, setImage] = useState(null);

    const [editMode, setEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);

    const [form] = Form.useForm();

    
    const getAllRecipes = async () => {
        try {
            const res = await getRecipes();
            setRecipes(res.data.data || []);
        } catch (error) {
            console.error(error);
            message.error("Failed to load recipes");
        }
    };

    useEffect(() => {
        getAllRecipes();
    }, []);

    
    const resetForm = () => {
        form.resetFields();
        setIngredients([""]);
        setImage(null);
        setEditMode(false);
        setEditingId(null);
    };

    
    const openEditModal = (recipe) => {
        setEditMode(true);
        setEditingId(recipe.id);

        form.setFieldsValue({
            Recipe_name: recipe.Recipe_name,
            Recipe_description: recipe.Recipe_description,
            Recipe_type: recipe.Recipe_type,
        });

        setIngredients(
            recipe.ingredients?.map(
                (ingredient) => ingredient.Ingredients_name
            ) || [""]
        );

        setOpen(true);
    };

    
    const saveRecipe = async () => {
        try {
            setLoading(true);

            const values = await form.validateFields();

            const formData = new FormData();

            formData.append("Recipe_name", values.Recipe_name);
            formData.append(
                "Recipe_description",
                values.Recipe_description
            );
            formData.append("Recipe_type", values.Recipe_type);

            ingredients
                .filter((item) => item.trim() !== "")
                .forEach((item) => {
                    formData.append("Recipe_ingredients", item);
                });

            if (image) {
                formData.append("Recipe_image", image);
            }

            if (editMode) {
                formData.append("id", editingId);
                await updateRecipe(formData);
                message.success("Recipe updated successfully!");
            } else {
                await createRecipe(formData);
                message.success("Recipe created successfully!");
            }

            setOpen(false);
            resetForm();
            getAllRecipes();
        } catch (error) {
            console.error(error);
            message.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    
    
    const handleDelete = async (id) => {
        try {
            await deleteRecipe(id);
            message.success("Recipe deleted successfully!");
            getAllRecipes();
        } catch (error) {
            console.error(error);
            message.error("Failed to delete recipe.");
        }
    };
    const toggleFavourite = async (recipeId) => {
        try {
            await toggleFavouriteApi(recipeId);

            getAllRecipes();
        } catch (err) {
            console.log(err);
            message.error("Couldn't update favourite");
        }
    };
    
    
    const filteredRecipes = recipes.filter((recipe) => {
        const matchCategory =
            category === "All" || recipe.Recipe_type === category;

        const matchSearch = recipe.Recipe_name
            .toLowerCase()
            .includes(search.toLowerCase());

        return matchCategory && matchSearch;
    });

    return (
        <div
            style={{
                padding: "35px 40px",
                background: "#EAF8EE",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <div style={{ marginBottom: 35 }}>
                <div
                    style={{
                        textAlign:"center",
                        marginBottom:30,
                }}
            >
                <div>
                    <h1
                        style={{
                            margin:0,
                            
                            fontSize: 34,
                            fontWeight:700,
                            color: "#2f3542",
                        }}
                    >
                        Browse Recipes
                    </h1>

                    <p
                        style={{
                            marginTop:10,
                            color: "#777",
                            fontSize: 16,
                            
                        }}
                    >         
                        Discover recipes shared by the CookPad community.
                    </p>
                </div>

                <div
                    style={{
                    display: "flex",
                    justifyContent:"center",
                    alignItems:"center",
                    gap: 15,
                    flexWrap:"wrap",
                    
                    }}
                >
                    <Input.Search
                        placeholder="Search recipes..."
                        allowClear
                        size="large"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ width: 380 }}
                    />

                    <Select 
                        size="large"
                        value={category}
                        onChange={setCategory}
                        style={{ width: 190 }}
                        options={[
                            { value: "All", label: "All Recipes" },
                            { value: "Vegetarian", label: "Vegetarian" },
                            { value: "Non-Vegetarian", label: "Non-Vegetarian" },
                        ]}
                    />
                </div>
            </div>
        </div>
        

            {/* Recipe Cards */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(250px, 1fr))",
                    gap: 25,
                }}
            >
                {filteredRecipes.length > 0 ? (
                    filteredRecipes.map((item) => (
                        <RecipeCard
                            key={item.id}
                            recipe={item}
                            onEdit={openEditModal}
                            onDelete={handleDelete}
                            onFavourite={toggleFavourite}
                            showAction={showAction}
                        />
                    ))
                ) : (
                    <h3>No recipes found.</h3>
                )}
            </div>

            {/* Recipe Modal */}
            <RecipeModal
                open={open}
                setOpen={setOpen}
                form={form}
                loading={loading}
                saveRecipe={saveRecipe}
                editMode={editMode}
                ingredients={ingredients}
                setIngredients={setIngredients}
                image={image}
                setImage={setImage}
                resetForm={resetForm}
            />
        </div>
    );
}

export default RecipeList;