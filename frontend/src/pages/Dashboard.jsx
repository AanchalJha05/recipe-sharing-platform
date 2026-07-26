import { useEffect, useState } from "react";
import {
    Card,
    Row,
    Col,
    Typography,
    Button,
    Tag,
    Spin,
    message,
} from "antd";
import {
    BookOutlined,
    StarOutlined,
    PlusOutlined,
    EyeOutlined,
} from "@ant-design/icons";
import { LuNotebookPen, LuSalad } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { GiChickenLeg } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../services/recipeApi";

const { Title, Paragraph } = Typography;

function Dashboard() {
    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        total: 0,
        veg: 0,
        nonveg: 0,
        favourite: 0,
        recent: [],
        favourites: [],
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const res = await getDashboard();
            setDashboard(res.data);
        } catch (err) {
            console.log(err);
            message.error("Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "60vh",
                }}
            >
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div
            style={{
                padding: 40,
                background: "#EAF8EE",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <Title style={{ marginBottom: 5 }}>
                Welcome Back 
            </Title>

            <Paragraph
                style={{
                    color: "#666",
                    marginBottom: 35,
                }}
            >
                Manage all your recipes from one place.
            </Paragraph>

            {/* Statistics */}
            <Row gutter={[20, 20]}>
                <Col xs={24} sm={12} md={6}>
                    <Card hoverable style={{ background: "#FFFFFF",border: "1px solid #DDEFE2",borderRadius: 14,}}>
                        <LuNotebookPen
                            style={{
                                fontSize: 32,
                                color: "#1677ff",
                            }}
                        />
                        <Title level={2}>{dashboard.total}</Title>
                        <Paragraph>Total Recipes</Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card hoverable style={{ background: "#FFFFFF",border: "1px solid #DDEFE2",borderRadius: 14,}}>
                        <FaStar
                            style={{
                                fontSize: 32,
                                color: "#faad14",
                            }}
                        />
                        <Title level={2}>{dashboard.favourite}</Title>
                        <Paragraph>Favourite Recipes</Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card hoverable style={{ background: "#FFFFFF",border: "1px solid #DDEFE2",borderRadius: 14,}}>
                        <LuSalad
                            style={{
                                fontSize: 32,
                                color: "green",
                            }}
                        />
                        <Title level={2}>{dashboard.veg}</Title>
                        <Paragraph>Vegetarian</Paragraph>
                    </Card>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Card hoverable style={{ background: "#FFFFFF",border: "1px solid #DDEFE2",borderRadius: 14,}}>
                        <GiChickenLeg
                            style={{
                                fontSize: 32,
                                color: "#ff4d4f",
                            }}
                        />
                        <Title level={2}>{dashboard.nonveg}</Title>
                        <Paragraph>Non-Vegetarian</Paragraph>
                    </Card>
                </Col>
            </Row>

            {/* Quick Actions */}
            <Card
                title="Quick Actions"
                style={{
                    marginTop: 35,
                    borderRadius: 12,
                }}
            >
                <Button
                    
                    icon={<PlusOutlined />}
                    onClick={() => navigate("/add")}
                    style={{
                        background: "#52C41A",
                        borderColor: "#52C41A",
                        color: "#fff",
                    }}
                >
                    Add Recipe
                </Button>

                <Button
                    style={{ marginLeft: 15,borderColor: "#52C41A",color: "#52C41A", }}
                    onClick={() => navigate("/recipes")}
                >
                    Browse Recipes
                </Button>
            </Card>
            <Card
                title="⭐ Favourite Recipes"
                style={{
                    marginTop: 35,
                    borderRadius: 14,
                    background: "#F8FFF9",
                    border: "1px solid #DDEFE2",
                }}
            >
                {dashboard.favourites.length === 0 ? (
                    <Paragraph
                        type="secondary"
                        style={{ textAlign: "center" }}
                    >
                        No favourite recipes yet.
                    </Paragraph>
                ) : (
                    <Row gutter={[20, 20]}>
                        {dashboard.favourites.map((recipe) => (
                            <Col xs={24} sm={12} md={8} key={recipe.id}>
                                <Card
                                    hoverable
                                    style={{
                                        borderRadius: 12,
                                        border: "1px solid #DDEFE2",
                                        overflow: "hidden",
                                    }}
                                    cover={
                                        recipe.Recipe_image && (
                                            <img
                                                src={recipe.Recipe_image}
                                                alt={recipe.Recipe_name}
                                                style={{
                                                    height: 180,
                                                    objectFit: "cover",
                                                }}
                                            />
                                        )
                                    }
                                >
                                    <Title level={5}>
                                        {recipe.Recipe_name}
                                    </Title>

                                    <Tag
                                        color={
                                            recipe.Recipe_type === "Vegetarian"
                                                ? "green"
                                                : "volcano"
                                        }
                                    >
                                        {recipe.Recipe_type}
                                    </Tag>

                                    <Button
                                        style={{
                                            marginTop: 15,
                                            background: "#52C41A",
                                            borderColor: "#52C41A",
                                            color: "#fff",
                                        }}
                                        block
                                        icon={<EyeOutlined />}
                                        onClick={() =>
                                            navigate(`/recipe/${recipe.id}`)
                                        }
                                    >
                                        View Recipe
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Card>
            {/* Recent Recipes */}
            <Card
                title="Recent Recipes"
                style={{
                    marginTop: 35,
                    borderRadius: 12,
                }}
            >
                {dashboard.recent.length === 0 ? (
                    <Paragraph
                        type="secondary"
                        style={{ textAlign: "center" }}
                    >
                        No recent recipes.
                    </Paragraph>
                ) : (
                    dashboard.recent.map((recipe) => (
                        <Card
                            key={recipe.id}
                            hoverable
                            size="small"
                            style={{
                                marginBottom: 15,
                                borderRadius: 10,
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent:
                                        "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <div>
                                    <Title
                                        level={5}
                                        style={{
                                            marginBottom: 6,
                                        }}
                                    >
                                        {recipe.Recipe_name}
                                    </Title>

                                    <Tag
                                        color={
                                            recipe.Recipe_type ===
                                            "Vegetarian"
                                                ? "green"
                                                : "volcano"
                                        }
                                    >
                                        {recipe.Recipe_type}
                                    </Tag>
                                </div>

                                <Button
                                    type="primary"
                                    ghost
                                    icon={<EyeOutlined />}
                                    onClick={() =>
                                        navigate(
                                            `/recipe/${recipe.id}`
                                        )
                                    }
                                >
                                    View
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </Card>
        </div>
    );
}

export default Dashboard;