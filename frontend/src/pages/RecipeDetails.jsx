import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Typography, Tag, List, Spin, message } from "antd";

import { getRecipeById } from "../services/recipeApi";

const { Title, Paragraph } = Typography;

function RecipeDetails() {
    const { id } = useParams();

    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRecipe();
    }, []);

    const loadRecipe = async () => {
        try {
            const res = await getRecipeById(id);
            setRecipe(res.data.data);
        } catch (err) {
            message.error("Failed to load recipe");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: 80 }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!recipe) {
        return <h2>Recipe not found</h2>;
    }

    return (
        <div
            style={{
                maxWidth: 900,
                margin: "40px auto",
            }}
        >
            <Card>
                {recipe.Recipe_image && (
                    <img
                        src={recipe.Recipe_image}
                        alt={recipe.Recipe_name}
                        style={{
                            width: "100%",
                            height: 350,
                            objectFit: "cover",
                            borderRadius: 10,
                            marginBottom: 20,
                        }}
                    />
                )}

                <Title>{recipe.Recipe_name}</Title>

                <Tag
                    color={
                        recipe.Recipe_type === "Vegetarian"
                            ? "green"
                            : "volcano"
                    }
                >
                    {recipe.Recipe_type}
                </Tag>

                <Paragraph
                    style={{
                        marginTop: 20,
                        fontSize: 16,
                    }}
                >
                    {recipe.Recipe_description}
                </Paragraph>

                <Title level={4}>Ingredients</Title>

                <List
                    bordered
                    dataSource={recipe.ingredients}
                    renderItem={(item) => (
                        <List.Item>
                            {item.Ingredients_name}
                        </List.Item>
                    )}
                />
            </Card>
        </div>
    );
}

export default RecipeDetails;