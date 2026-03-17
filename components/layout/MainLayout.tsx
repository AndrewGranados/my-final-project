"use client";

import {
  MenuProps,
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Drawer,
  Grid,
} from "antd";
import {
  SafetyOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MenuOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const routes: Record<string, string> = {
    perfil: "/seguridad/perfil",
    usuario: "/seguridad/usuario",
    modulo: "/seguridad/modulo",
    permisos: "/seguridad/permisos-perfil",
    "p1-1": "/principal1/p1-1",
    "p1-2": "/principal1/p1-2",
    "p2-1": "/principal2/p2-1",
    "p2-2": "/principal2/p2-2",
  };

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

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    const path = routes[e.key];
    if (path) {
      router.push(path);
      setOpen(false);
    }
  };
  const pathSegments = pathname.split("/").filter(Boolean);
  
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const url = "/" + pathSegments.slice(0, index + 1).join("/");

    return {
      title:
        index === pathSegments.length - 1 ? (
          segment
        ) : (
          <a onClick={() => router.push(url)}>
            {segment.charAt(0).toUpperCase() + segment.slice(1)}
          </a>
        ),
    };
  });

  breadcrumbItems.unshift({
    title: (
      <a onClick={() => router.push("/dashboard")}>
        <HomeOutlined /> Inicio
      </a>
    ),
  });

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
            style={{ flex: 1, marginLeft: 60 }}
            onClick={handleMenuClick}
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
        <Menu mode="inline" items={menuItems} onClick={handleMenuClick} />
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
          <Breadcrumb separator="›" items={breadcrumbItems} />
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
