import { Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";

const { Title } = Typography;

function Login() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const values = await form.validateFields();

            const res = await loginUser(values);
            console.log(res.data);

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            message.success("Login Successful!");

            navigate("/");
        } catch (err) {
            message.error(
                err.response?.data?.error || "Login Failed"
            );
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f5f5f5",
            }}
        >
            <Card style={{ width: 420 }}>
                <Title level={2} style={{ textAlign: "center" }}>
                    🍲 CookPad
                </Title>

                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true, message: "Enter username" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: "Enter password" },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        
                        block
                        onClick={handleLogin}
                        style={{background:"#52C41A",borderColor: "#52C41A",color:"#fff",height:44,borderRadius:8,fontWeight:600,transition:"all 0.3s ease",}}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#389E0D";
                            e.currentTarget.style.borderColor = "#389E0D";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#52C41A";
                            e.currentTarget.style.borderColor = "#52C41A";
                        }}
                    >
                        Login
                    </Button>

                    <p
                        style={{
                            marginTop: 20,
                            textAlign: "center",
                        }}
                    >
                        Don't have an account?{" "}
                        <Link to="/register">
                            Register
                        </Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
}

export default Login;