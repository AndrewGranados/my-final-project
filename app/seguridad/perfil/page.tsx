/*
"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Table, Button, Input, Select, Radio, Row, Col, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [perfiles, setPerfiles] = useState([]);

  const fetchPerfiles = async () => {
    const res = await fetch("/api/perfil");
    const data = await res.json();
    setPerfiles(data);
  };

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const columns = [
    {
      title: "Perfil",
      dataIndex: "strNombrePerfil",
    },
    {
      title: "Estado",
      render: () => "Activo",
    },
    {
      title: "Super Admin",
      render: (r: any) => (r.bitAdministrador ? "Sí" : "No"),
    },
  ];

  return (
    <MainLayout>
      {/* FILTROS */ /*}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <label>Perfil:</label>
          <Input />
        </Col>

        <Col span={6}>
          <label>Estado:</label>
          <Select style={{ width: "100%" }} />
        </Col>

        <Col span={6} style={{ display: "flex", alignItems: "end" }}>
          <Space>
            <Button type="primary">Buscar</Button>
            <Button>Limpiar</Button>
          </Space>
        </Col>
      </Row>

      <Radio defaultChecked>Todos</Radio>

      <div style={{ margin: "16px 0" }}>
        <Button type="primary" icon={<PlusOutlined />}>
          Nuevo
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={perfiles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </MainLayout>
  );
}
*/

"use client";

import MainLayout from "@/components/layout/MainLayout";
import { Table, Button, Input, Select, Radio, Row, Col, Space, Popconfirm, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import PerfilModal from "./PerfilModal";

export default function PerfilPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);

  const [perfiles, setPerfiles] = useState([]);

  const fetchPerfiles = async () => {
    const res = await fetch("/api/perfil");
    const data = await res.json();
    setPerfiles(data);
  };

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const columns = [
    {
      title: "Perfil",
      dataIndex: "strNombrePerfil",
    },
    {
      title: "Estado",
      render: () => "Activo",
    },
    {
      title: "Super Admin",
      render: (r: any) => (r.bitAdministrador ? "Sí" : "No"),
    },
    {
      title: "Acciones",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="link"
            onClick={() => {
              setEditing(record);
              setOpen(true);
            }}
          >
            Editar
          </Button>

          <Popconfirm
            title="¿Eliminar perfil?"
            onConfirm={async () => {
              try {
                const res = await fetch(`/api/perfil/${record.id}`, {
                  method: "DELETE",
                });

                if (!res.ok) throw new Error();

                message.success("Perfil eliminado");
                fetchPerfiles();
              } catch {
                message.error("Error al eliminar");
              }
            }}
          >
            <Button danger type="link">
              Eliminar
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      {/* FILTROS */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <label>Perfil:</label>
          <Input />
        </Col>

        <Col span={6}>
          <label>Estado:</label>
          <Select style={{ width: "100%" }} />
        </Col>

        <Col span={6} style={{ display: "flex", alignItems: "end" }}>
          <Space>
            <Button type="primary">Buscar</Button>
            <Button>Limpiar</Button>
          </Space>
        </Col>
      </Row>

      <Radio defaultChecked>Todos</Radio>

      <div style={{ margin: "16px 0" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Nuevo
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={perfiles}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <PerfilModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchPerfiles}
        initialValues={editing}
      />
    </MainLayout>
  );
}
