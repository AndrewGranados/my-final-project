"use client";

import { Card, Row, Col, Typography, Statistic, Button, Avatar } from "antd";
import {
  UserOutlined,
  ProjectOutlined,
  CheckCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;

export default function DashboardPage({ user }: any) {
  return (
    <>
      {/* BIENVENIDA */}
      <div
        style={{
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        {/*
        <Avatar
          size={64}
          src={user?.imagenUrl}
          style={{ backgroundColor: "#1677ff" }}
        >
          {user?.strNombreUsuario?.[0]}
        </Avatar>
        */}

        <div>
          <Title level={2} style={{ margin: 0 }}>
            👋 Bienvenido de nuevo
          </Title>

        </div>
      </div>

      {/* CARDS RESUMEN */}
      <Row gutter={16}>
        <Col span={6}>
          <Card>
            <Statistic title="Usuarios" value={5} prefix={<UserOutlined />} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Proyectos" value={12} prefix={<ProjectOutlined />} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Completados" value={8} prefix={<CheckCircleOutlined />} />
          </Card>
        </Col>

        <Col span={6}>
          <Card>
            <Statistic title="Pendientes" value={4} prefix={<ProjectOutlined />} />
          </Card>
        </Col>
      </Row>

      {/* SECCIÓN EXTRA */}
      <Card title="Actividad reciente" style={{ marginTop: 24 }}>
        <Text type="secondary">
          Aquí puedes mostrar logs, notificaciones o últimos movimientos.
        </Text>
      </Card>
    </>
  );
}