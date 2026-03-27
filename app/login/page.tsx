/*
"use client";

import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

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
        padding: "30px",
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
            rules={[
              { required: true, message: "Ingresa tu usuario" },
              { max: 20, message: "Máximo 20 caracteres" }
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Usuario"
              maxLength={20}
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
*/

"use client";

import { Form, Input, Button, Card, message, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const { Title, Text } = Typography;

export default function LoginPage() {
  const router = useRouter();
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const onFinish = async (values: any) => {
    const token = recaptchaRef.current?.getValue();

    if (!token) {
      message.error("Verifica el reCAPTCHA");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        ...values,
        recaptchaToken: token,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      message.error(data.message);
      return;
    }

    recaptchaRef.current?.reset(); // limpia captcha
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
        padding: "30px",
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
            rules={[
              { required: true, message: "Ingresa tu usuario" },
              { max: 20, message: "Máximo 20 caracteres" },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder="Usuario"
              maxLength={20}
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

          {/* RECAPTCHA */}
          <div style={{ marginBottom: 15 }}>
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
              ref={recaptchaRef}
            />
          </div>

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