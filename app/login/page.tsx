"use client";

import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();

  const onFinish = async (values: any) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await res.json();

    if (!res.ok) {
      message.error(data.message);
      return;
    }

//    router.push("/dashboard");
    window.location.href = "/dashboard";
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fcfcfc",
        //        background: "linear-gradient(135deg,#1f4037,#99f2c8)",
      }}
    >
      <Card
        style={{
          width: 380,
          borderRadius: 12,
          boxShadow: "0 15px 40px rgba(0,0,0,0.2)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <Title level={3} style={{ marginBottom: 0 }}>
            Iniciar sesión
          </Title>
          <Text type="secondary">Accede al sistema</Text>
        </div>

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="usuario"
            label="Usuario"
            rules={[{ required: true, message: "Ingresa tu usuario" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Usuario"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Contraseña"
            rules={[{ required: true, message: "Ingresa tu contraseña" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined />}
              placeholder="Contraseña"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            style={{
              marginTop: 10,
              height: 45,
              fontWeight: 600,
            }}
          >
            Entrar
          </Button>
        </Form>
      </Card>
    </div>
  );
}
