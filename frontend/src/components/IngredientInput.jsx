import { Button, Input } from "antd";

function IngredientInput({ ingredients, setIngredients }) {

    const addIngredient = () => {
        setIngredients([...ingredients, ""]);
    };

    const updateIngredient = (value, index) => {
        const arr = [...ingredients];
        arr[index] = value;
        setIngredients(arr);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    return (
        <div>
            {ingredients.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "10px"
                    }}
                >
                    <Input
                        value={item}
                        onChange={(e) =>
                            updateIngredient(e.target.value, index)
                        }
                    />

                    <Button danger onClick={() => removeIngredient(index)}>
                        X
                    </Button>
                </div>
            ))}

            <Button type="dashed" block onClick={addIngredient}>
                + Add Ingredient
            </Button>
        </div>
    );
}

export default IngredientInput;