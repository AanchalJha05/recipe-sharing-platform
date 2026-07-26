import { Form, Input, Select, Button } from "antd";
import { useMemo } from "react";
import IngredientInput from "./IngredientInput";

function RecipeForm({
    form,
    onSave,
    loading,
    ingredients,
    setIngredients,
    image,
    setImage,
    editMode,
}) {
    const previewUrl = useMemo(() => {
        if (!image) return null;
        return URL.createObjectURL(image);
    }, [image]);

    return (
        <Form layout="vertical" form={form}>
            {/* Recipe Name */}
            <Form.Item
                label="Recipe Name"
                name="Recipe_name"
                rules={[
                    {
                        required: true,
                        message: "Please enter recipe name",
                    },
                ]}
            >
                <Input
                    size="large"
                    placeholder="Enter recipe name"
                />
            </Form.Item>

            {/* Description */}
            <Form.Item
                label="Description"
                name="Recipe_description"
                rules={[
                    {
                        required: true,
                        message: "Please enter description",
                    },
                ]}
            >
                <Input.TextArea
                    rows={4}
                    placeholder="Tell everyone about your recipe..."
                />
            </Form.Item>

            {/* Recipe Type */}
            <Form.Item
                label="Recipe Type"
                name="Recipe_type"
                rules={[{ required: true }]}
            >
                <Select
                    size="large"
                    placeholder="Select recipe type"
                    options={[
                        {
                            value: "Vegetarian",
                            label: "Vegetarian",
                        },
                        {
                            value: "Non-Vegetarian",
                            label: "Non-Vegetarian",
                        },
                    ]}
                />
            </Form.Item>

            {/* Image Upload */}
            <Form.Item label="Recipe Image">
                <div
                    style={{
                        border: "2px dashed #95DE64",
                        borderRadius: 14,
                        padding: 20,
                        background: "#F4FCF6",
                        textAlign: "center",
                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                    />

                    <p
                        style={{
                            marginTop: 10,
                            color: "#4A7C59",
                            marginBottom: 0,
                            fontSize: 14,
                        }}
                    >
                        Upload a delicious photo of your recipe 🍽️
                    </p>
                </div>

                {/* Image Preview */}
                {previewUrl && (
                    <div
                        style={{
                            marginTop: 20,
                            textAlign: "center",
                        }}
                    >
                        <img
                            src={previewUrl}
                            alt="Preview"
                            style={{
                                width: "100%",
                                maxHeight: 300,
                                objectFit: "cover",
                                borderRadius: 14,
                                border: "2px solid #DDEFE2",
                                boxShadow:
                                    "0 8px 20px rgba(82,196,26,0.15)",
                            }}
                        />
                    </div>
                )}
            </Form.Item>

            {/* Ingredients */}
            <Form.Item label="Ingredients">
                <IngredientInput
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                />
            </Form.Item>

            {/* Save Button */}
            <Button
                size="large"
                block
                loading={loading}
                onClick={onSave}
                style={{
                    marginTop: 20,
                    height: 50,
                    borderRadius: 12,
                    fontWeight: 600,
                    fontSize: 16,
                    background: "#52C41A",
                    borderColor: "#52C41A",
                    color: "#fff",
                    boxShadow: "0 6px 16px rgba(82,196,26,0.25)",
                }}
            >
                {editMode ? "Update Recipe" : "Save Recipe"}
            </Button>
        </Form>
    );
}

export default RecipeForm;