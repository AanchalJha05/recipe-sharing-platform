import { useState } from "react";
import { Form, Card, Typography, message, Divider } from "antd";
import { useNavigate } from "react-router-dom";

import RecipeForm from "../components/RecipeForm";
import { createRecipe } from "../services/recipeApi";

const { Title, Paragraph } = Typography;

function AddRecipe() {
    const navigate = useNavigate();

    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const [ingredients, setIngredients] = useState([""]);
    const [image, setImage] = useState(null);

    const resetForm = () => {
        form.resetFields();
        setIngredients([""]);
        setImage(null);
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

            await createRecipe(formData);

            message.success("Recipe added successfully 🎉");

            resetForm();

            navigate("/my-recipes");
        } catch (err) {
            console.log(err);
            message.error("Failed to add recipe");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                maxWidth: "900px",
                margin: "40px auto",
                padding: "0 20px",
            }}
        >
            <Card
                style={{
                    borderRadius: 20,
                    border: "none",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    overflow: "hidden",
                }}
                bodyStyle={{ padding: 0 }}
            >
                {/* Header */}

                <div
                    style={{
                        padding: "35px 40px",
                        background: "#EAF8EE",
                    }}
                >
                    <Title level={2} style={{ marginBottom: 8 }}>
                        Add New Recipe
                    </Title>

                    <Paragraph
                        type="secondary"
                        style={{
                            marginBottom: 0,
                            fontSize: 15,
                        }}
                    >
                        Share your favourite recipe with the CookPad community.
                    </Paragraph>
                </div>

                <Divider style={{ margin: 0 }} />

                {/* Form */}

                <div
                    style={{
                        padding: "35px 40px",
                    }}
                >
                    <RecipeForm
                        form={form}
                        onSave={saveRecipe}
                        loading={loading}
                        ingredients={ingredients}
                        setIngredients={setIngredients}
                        image={image}
                        setImage={setImage}
                        editMode={false}
                    />
                </div>
            </Card>
        </div>
    );
}

export default AddRecipe;