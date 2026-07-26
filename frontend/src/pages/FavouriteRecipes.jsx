import { useEffect, useState } from "react";
import { Typography, message } from "antd";

import RecipeCard from "../components/RecipeCard";
import {
    getFavouriteRecipes,
    toggleFavourite,
} from "../services/recipeApi";

const { Title, Paragraph } = Typography;

function FavouriteRecipes() {
    const [recipes, setRecipes] = useState([]);

    const fetchRecipes = async () => {
        try {
            const res = await getFavouriteRecipes();
            setRecipes(res.data.data || []);
        } catch (err) {
            console.log(err);
            message.error("Failed to load favourite recipes");
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleFavourite = async (recipeId) => {
        try {
            await toggleFavourite(recipeId);
            fetchRecipes();
        } catch (err) {
            message.error("Couldn't update favourite");
        }
    };

    return (
        <div
            style={{
                padding: 30,
                background: "#EAF8EE",
                minHeight: "100vh",
            }}
        >
            <Title level={2}>⭐ Favourite Recipes</Title>

            <Paragraph type="secondary">
                Your favourite recipes all in one place.
            </Paragraph>

            {recipes.length === 0 ? (
                <div
                    style={{
                        textAlign: "center",
                        padding: "60px",
                        color: "#888",
                    }}
                >
                    <h3>No favourite recipes yet.</h3>
                    <p>
                        Browse recipes and click the star icon to add them to
                        your favourites.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fit, minmax(320px,320px))",
                        justifyContent: "center",
                        gap: 28,
                    }}
                >
                    {recipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            showAction={false}
                            onFavourite={handleFavourite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavouriteRecipes;