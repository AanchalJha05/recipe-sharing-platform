import {
    DashboardOutlined,
    BookOutlined,
    UserOutlined,
    PlusCircleOutlined,
    LogoutOutlined,
    FireOutlined,
} from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { FaStar } from "react-icons/fa";

function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div
            style={{
                width: 260,
                height: "100vh",
                background: "#EAF8EE",
                color: "#2F3E2F",
                position: "fixed",
                left: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRight: "1px solid #DDEFE2",
            }}
        >
            {/* Top Section */}
            <div>
                {/* Logo */}
                <div
                    style={{
                        padding: "28px 20px",
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                    }}
                >
                    <div
                        style={{
                            width: 46,
                            height: 46,
                            borderRadius: 14,
                            background:
                                "linear-gradient(135deg,#ff7b00,#ff3d81)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 22,
                        }}
                    >
                        <FireOutlined />
                    </div>

                    <div>
                        <div
                            style={{
                                fontSize: 22,
                                fontWeight: "700",
                                color: "#2E7D32",
                            }}
                        >
                            CookPad
                        </div>

                        <div
                            style={{
                                color:"#6B7B6B",
                                fontSize: 12,
                            }}
                        >
                            Recipe Dashboard
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <Menu
                    mode="inline"
                    theme="light"
                    selectedKeys={[location.pathname]}
                    style={{
                        background: "transparent",
                        border: "none",
                        padding: "0 10px",
                        color:"#2F3E2F",
                    }}
                    onClick={({ key }) => {
                        navigate(key);
                    }}
                    items={[
                        {
                            key: "/",
                            icon: <DashboardOutlined />,
                            label: "Dashboard",
                        },
                        {
                            key: "/browse",
                            icon: <BookOutlined />,
                            label: "Browse Recipes",
                        },
                        {
                            key: "/my-recipes",
                            icon: <UserOutlined />,
                            label: "My Recipes",
                        },
                        {
                            key: "/favourites",
                            icon:<FaStar />,
                            label:"Favourite Recipes",
                        },
                        {
                            key: "/add",
                            icon: <PlusCircleOutlined />,
                            label: "Add Recipe",
                        },
                    ]}
                />
            </div>

            {/* Bottom Section */}
            <div
                style={{
                    padding: 20,
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        marginBottom: 20,
                    }}
                >
                    <Avatar
                        size={46}
                        style={{
                            background:
                                "linear-gradient(135deg,#52C41A,#95DE64)",
                            fontWeight: "bold",
                        }}
                    >
                        A
                    </Avatar>

                    <div>
                        <div
                            style={{
                                fontWeight: 600,
                            }}
                        >
                            Welcome
                        </div>

                        <div
                            style={{
                                fontSize: 12,
                                color: "#6B7B6B",
                            }}
                        >
                            Happy Cooking 👨‍🍳
                        </div>
                    </div>
                </div>

                {/* Logout Button */}
                <div
                    onClick={logout}
                    style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        width: "150px",
                        margin: "0 auto",
                        padding: "10px",
                        borderRadius: 12,
                        border: "1px solid #ef4444",
                        color: "#ef4444",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = "#ef4444";
                        e.currentTarget.style.color = "#ffffff";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#ef4444";
                    }}
                >
                    <LogoutOutlined />
                    Logout
                </div>
            </div>
        </div>
    );
}

export default Sidebar;