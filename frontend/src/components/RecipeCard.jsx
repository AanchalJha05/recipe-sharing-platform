import { useNavigate } from "react-router-dom";
import { Button, Tag } from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    StarOutlined,
    StarFilled,
} from "@ant-design/icons";

function RecipeCard({
    recipe,
    onEdit,
    onDelete,
    onFavourite,
    showAction = true,
}) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/recipe/${recipe.id}`)}
            style={{
                background: "#fff",
                borderRadius: 18,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                transition: "0.35s",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                height: 330,
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-8px)";
                e.currentTarget.style.boxShadow =
                    "0 18px 35px rgba(0,0,0,.12)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                    "0 8px 24px rgba(0,0,0,.08)";
            }}
        >
            {/* IMAGE */}
            <div
                style={{
                    height: 160,
                    background: "#f6f6f6",
                    overflow: "hidden",
                    position: "relative",
                }}
            >
                {/* Favourite Button */}
                <Button
                    type="text"
                    shape="circle"
                    onClick={(e) => {
                        e.stopPropagation();
                        onFavourite?.(recipe.id);
                    }}
                    style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "rgba(255,255,255,0.9)",
                        zIndex: 10,
                    }}
                    icon={
                        recipe.is_favourite ? (
                            <StarFilled
                                style={{
                                    color: "#fadb14",
                                    fontSize: 20,
                                }}
                            />
                        ) : (
                            <StarOutlined
                                style={{
                                    fontSize: 20,
                                }}
                            />
                        )
                    }
                />

                {recipe.Recipe_image ? (
                    <img
                        src={recipe.Recipe_image}
                        alt={recipe.Recipe_name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 55,
                            background: "#fafafa",
                        }}
                    >
                        🍽️
                    </div>
                )}
            </div>

            {/* CONTENT */}
            <div
                style={{
                    padding: 15,
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                }}
            >
                <h3
                    style={{
                        marginBottom: 10,
                        fontSize: 18,
                        fontWeight: 700,
                    }}
                >
                    {recipe.Recipe_name}
                </h3>

                <p
                    style={{
                        color: "#666",
                        lineHeight: 1.6,
                        flex: 1,
                    }}
                >
                    {(recipe.Recipe_description||"").length > 60
                        ? recipe.Recipe_description.slice(0, 60) + "..."
                        : recipe.Recipe_description}
                </p>

                <Tag
                    color={
                        recipe.Recipe_type === "Vegetarian"
                            ? "green"
                            : "volcano"
                    }
                    style={{
                        width: "fit-content",
                        marginBottom: 10,
                    }}
                >
                    {recipe.Recipe_type}
                </Tag>

                {showAction && (
                    <div
                        style={{
                            display: "flex",
                            gap: 10,
                        }}
                    >
                        <Button
                            icon={<EditOutlined />}
                            block
                            onClick={(e) => {
                                e.stopPropagation();
                                onEdit(recipe);
                            }}
                            style={{background:"#52C41A",border:"#52C41A",color: "#fff",fontWeight:600,}}
                        >
                            Edit
                        </Button>

                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            block
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete?.(recipe.id);
                            }}
                        >
                            Delete
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RecipeCard;