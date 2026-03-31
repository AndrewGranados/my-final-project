"use client";

import {
  MenuProps,
  Layout,
  Menu,
  Breadcrumb,
  Button,
  Drawer,
  Grid,
  Popconfirm,
} from "antd";
import {
  SafetyOutlined,
  AppstoreOutlined,
  HomeOutlined,
  MenuOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

export default function MainLayout({
  children,
  permisos,
}: {
  children: React.ReactNode;
  permisos: string[];
}) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const router = useRouter();
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  console.log("Permisos", permisos);

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

  /*
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
*/
  const menuItems = [
    {
      key: "seguridad",
      icon: <SafetyOutlined />,
      label: "Seguridad",
      children: [
        permisos.includes("Perfil") && { key: "perfil", label: "Perfil" },
        permisos.includes("Usuario") && { key: "usuario", label: "Usuario" },
        permisos.includes("Módulo") && { key: "modulo", label: "Módulo" },
        permisos.includes("Permisos Perfil") && {
          key: "permisos",
          label: "Permisos Perfil",
        },
      ].filter(Boolean),
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
  ].filter((menu) => menu.children.length > 0);

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

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

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
          <div
            style={{ display: "flex", alignItems: "center", gap: 12, flex: 1 }}
          >
            <Menu
              mode="horizontal"
              items={menuItems}
              style={{ flex: 1, marginLeft: 60 }}
              onClick={handleMenuClick}
            />
            <Popconfirm
              title="¿Cerrar sesión?"
              okText="Sí"
              cancelText="No"
              onConfirm={handleLogout}
            >
              <Button danger icon={<LogoutOutlined />} type="primary">
                Cerrar sesión
              </Button>
            </Popconfirm>
          </div>
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

        <div style={{ marginTop: 20 }}>
          <Popconfirm
              title="¿Cerrar sesión?"
              okText="Sí"
              cancelText="No"
              onConfirm={handleLogout}
            >
              <Button block danger icon={<LogoutOutlined />} type="primary">
                Cerrar sesión
              </Button>
            </Popconfirm>
        </div>
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
  )
}
