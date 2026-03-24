"use client";

import { Table, Button, Input, Select, Radio, Row, Col, Space } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import UsuarioModal from "./UsuarioModal";

export default function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtros, setFiltros] = useState({
    usuario: "",
    perfil: "",
    estado: "",
  });
  const [open, setOpen] = useState(false);

  const fetchUsuarios = async () => {
    const res = await fetch("/api/usuario");
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const columns = [
    {
      title: "Usuario",
      dataIndex: "strNombreUsuario",
    },
    {
      title: "Perfil",
      render: (r: any) => r.perfil?.strNombrePerfil,
    },
    {
      title: "Tipo Usuario",
      render: (r: any) =>
        r.perfil?.bitAdministrador ? "Administrador" : "Normal",
    },
    {
      title: "Estado",
      render: (r: any) => (r.idEstadoUsuario ? "Activo" : "Inactivo"),
    },
    {
      title: "Estado Registro",
      render: () => "OK",
    },
    {
      title: "Editar",
      render: () => <EditOutlined style={{ cursor: "pointer" }} />,
    },
    {
      title: "Eliminar",
      render: () => <DeleteOutlined style={{ cursor: "pointer" }} />,
    },
  ];

  return (
    <div>
      {/* FILTROS */}
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={6}>
          <label>Usuario:</label>
          <Input
            onChange={(e) =>
              setFiltros({ ...filtros, usuario: e.target.value })
            }
          />
        </Col>

        <Col span={6}>
          <label>Perfil:</label>
          <Select style={{ width: "100%" }} />
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

      {/* RADIO */}
      <Radio defaultChecked>Todos</Radio>

      {/* BOTÓN CREAR */}
      <div style={{ margin: "16px 0" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Nuevo
        </Button>
      </div>

      {/* TABLA */}
      <Table
        columns={columns}
        dataSource={usuarios}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />

      <UsuarioModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchUsuarios}
      />
    </div>
  );
}
