"use client";

import { Layout, Menu, Breadcrumb, Button, Drawer, Grid } from "antd";
import {
  SafetyOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useState } from "react";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [open, setOpen] = useState(false);

  const menuItems = [
    {
      key: "seguridad",
      icon: <SafetyOutlined />,
      label: "Seguridad",
      children: [
        { key: "perfil", label: "Perfil" },
        { key: "usuario", label: "Usuario" },
        { key: "modulo", label: "Módulo" },
        { key: "permisos", label: "Permisos Perfil" },
      ],
    },
    {
      key: "principal1",
      icon: <AppstoreOutlined />,
      label: "Principal 1",
      children: [
        { key: "p1-1", label: "Principal 1.1" },
        { key: "p1-2", label: "Principal 1.2" },
      ],
    },
    {
      key: "principal2",
      icon: <AppstoreOutlined />,
      label: "Principal 2",
      children: [
        { key: "p2-1", label: "Principal 2.1" },
        { key: "p2-2", label: "Principal 2.2" },
      ],
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      
      {/* HEADER */}
      <Header
        style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <div style={{ fontWeight: 600 }}>Sistema</div>

        {/* MENÚ PARA PC */}
        {!isMobile && (
          <Menu
            mode="horizontal"
            items={menuItems}
            style={{ flex: 1, marginLeft: 40 }}
          />
        )}

        {/* BOTÓN PARA MÓVIL */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined />}
            onClick={() => setOpen(true)}
          />
        )}
      </Header>

      {/* DRAWER MÓVIL */}
      <Drawer
        title="Menú"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <Menu mode="inline" items={menuItems} />
      </Drawer>

      <Content style={{ padding: "16px 24px" }}>
        
        {/* BREADCRUMB */}
        <div
          style={{
            background: "#fff",
            padding: "10px 16px",
            borderRadius: 8,
            border: "1px solid #f0f0f0",
            marginBottom: 16,
          }}
        >
          <Breadcrumb
            separator="›"
            items={[
              {
                title: (
                  <>
                    <HomeOutlined /> Inicio
                  </>
                ),
              },
              { title: "Modulo" },
            ]}
          />
        </div>

        {/* CONTENIDO */}
        <div
          style={{
            padding: 24,
            background: "#fff",
            minHeight: 360,
            borderRadius: 8,
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}