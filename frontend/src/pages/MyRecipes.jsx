import { useEffect, useState } from "react";
import { Form, message, Typography, Card } from "antd";
import RecipeCard from "../components/RecipeCard";
import RecipeModal from "../components/RecipeModal";
import {
    getMyRecipes,
    updateRecipe,
    deleteRecipe,
    toggleFavourite as toggleFavouriteApi,
} from "../services/recipeApi";

const { Title, Paragraph } = Typography;

function MyRecipes() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);

    const [form] = Form.useForm();

    const [ingredients, setIngredients] = useState([""]);
    const [image, setImage] = useState(null);

    const [editingId, setEditingId] = useState(null);

    // Fetch Recipes
    const fetchRecipes = async () => {
        try {
            const res = await getMyRecipes();
            setRecipes(res.data.data || []);
        } catch (err) {
            message.error("Failed to load recipes");
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    // Reset Form
    const resetForm = () => {
        form.resetFields();
        setIngredients([""]);
        setImage(null);
        setEditingId(null);
    };

    // Open Edit Modal
    const openEdit = (recipe) => {
        setEditingId(recipe.id);

        form.setFieldsValue({
            Recipe_name: recipe.Recipe_name,
            Recipe_description: recipe.Recipe_description,
            Recipe_type: recipe.Recipe_type,
        });

        setIngredients(
            recipe.ingredients?.map((i) => i.Ingredients_name) || [""]
        );

        setOpen(true);
    };

    // Update Recipe
    const saveRecipe = async () => {
        try {
            setLoading(true);

            const values = await form.validateFields();

            const formData = new FormData();

            formData.append("id", editingId);
            formData.append("Recipe_name", values.Recipe_name);
            formData.append(
                "Recipe_description",
                values.Recipe_description
            );
            formData.append("Recipe_type", values.Recipe_type);

            ingredients
                .filter((i) => i.trim() !== "")
                .forEach((i) => {
                    formData.append("Recipe_ingredients", i);
                });

            if (image) {
                formData.append("Recipe_image", image);
            }

            await updateRecipe(formData);

            message.success("Recipe updated successfully 🌿");

            setOpen(false);
            resetForm();
            fetchRecipes();
        } catch (err) {
            message.error("Update failed");
        } finally {
            setLoading(false);
        }
    };

    // Delete Recipe
    const handleDelete = async (id) => {
        try {
            await deleteRecipe(id);
            message.success("Recipe deleted");
            fetchRecipes();
        } catch (err) {
            message.error("Delete failed");
        }
    };

    // Favourite
    const toggleFavourite = async (recipeId) => {
        try {
            await toggleFavouriteApi(recipeId);
            fetchRecipes();
        } catch (err) {
            message.error("Couldn't update favourite");
        }
    };

    return (
        <div
            style={{
                padding: 35,
                minHeight: "100vh",
                background: "#F2FBF5",
            }}
        >
            <Title
                level={2}
                style={{
                    color: "#2E7D32",
                    marginBottom: 6,
                }}
            >
                My Recipes 🍽️
            </Title>

            <Paragraph
                style={{
                    color: "#6B7B6B",
                    marginBottom: 30,
                }}
            >
                Manage the recipes you've shared with the CookPad community.
            </Paragraph>

            <RecipeModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    resetForm();
                }}
                onSave={saveRecipe}
                form={form}
                loading={loading}
                ingredients={ingredients}
                setIngredients={setIngredients}
                image={image}
                setImage={setImage}
                editMode={true}
            />

            {recipes.length === 0 ? (
                <Card
                    style={{
                        textAlign: "center",
                        padding: "40px",
                        borderRadius: 18,
                        background: "#FFFFFF",
                        border: "1px solid #DDEFE2",
                        boxShadow:
                            "0 8px 24px rgba(0,0,0,0.05)",
                    }}
                >
                    <Title
                        level={4}
                        style={{
                            color: "#2E7D32",
                        }}
                    >
                        No recipes yet 
                    </Title>

                    <Paragraph
                        style={{
                            color: "#6B7B6B",
                            marginBottom: 0,
                        }}
                    >
                        Add your first recipe from the Add Recipe page.
                    </Paragraph>
                </Card>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(320px, 320px))",
                        justifyContent: "center",
                        gap: 28,
                    }}
                >
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onEdit={openEdit}
                            onDelete={handleDelete}
                            onFavourite={toggleFavourite}
                            showAction={true}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyRecipes;