import { Card, Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authApi";

const { Title } = Typography;

function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const values = await form.validateFields();

            await registerUser(values);

            message.success("Account Created Successfully!");

            navigate("/login");
        } catch (err) {
            message.error("Registration Failed");
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
                    CookPad
                </Title>

                <Form layout="vertical" form={form}>
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true },
                            { type: "email" },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        label="Confirm Password"
                        name="password2"
                        rules={[
                            { required: true },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button
                        
                        block
                        onClick={handleRegister}
                        style={{background:"#52C41A",borderColor:"#52C41A",color: "#fff",height:44,borderRadius:8,fontWeight:600,transition:"all 0.3s ease",}}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#389E0D";
                            e.currentTarget.style.borderColor = "#389E0D";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#52C41A";
                            e.currentTarget.style.borderColor = "#52C41A";
                        }}
                    >
                        Register
                    </Button>

                    <p
                        style={{
                            marginTop: 20,
                            textAlign: "center",
                        }}
                    >
                        Already have an account?{" "}
                        <Link to="/login">
                            Login
                        </Link>
                    </p>
                </Form>
            </Card>
        </div>
    );
}

export default Register;