"use client";

//import MainLayout from "@/components/layout/MainLayout";
import {
  Table,
  Button,
  Input,
  Select,
  Radio,
  Row,
  Col,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import PerfilModal from "./PerfilModal";
import { usePermissions } from "@/lib/usePermissions";

export default function PerfilPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [perfiles, setPerfiles] = useState([]);
  const [searchPerfil, setSearchPerfil] = useState("");
  const [estado, setEstado] = useState<string | null>(null);

  const permisos = usePermissions("Perfil");

  const fetchPerfiles = async () => {
    const res = await fetch("/api/perfil");
    const data = await res.json();
    console.log("PERFILES:", data);
    setPerfiles(data);
  };

  useEffect(() => {
    fetchPerfiles();
  }, []);

  const filteredPerfiles = perfiles.filter((u: any) => {
    const matchPerfil = u.strNombrePerfil
      ?.toLowerCase()
      .includes(searchPerfil.toLowerCase());

    const matchEstado =
      estado === null
        ? true
        : estado === "si"
          ? u.bitAdministrador === true
          : u.bitAdministrador === false;

    return matchEstado && matchPerfil;
  });

  const handleDelete = async (record: any) => {
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
  };

  const columns = [
    {
      title: "Perfil",
      dataIndex: "strNombrePerfil",
    },
    {
      title: "Estado",
      render: (r: any) => (
        <span
          style={{
            color: r.bitActivo ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {r.bitActivo ? "Activo" : "Inactivo"}
        </span>
      ),
    },
    {
      title: "Super Admin",
      render: (r: any) => (r.bitAdministrador ? "Sí" : "No"),
    },
    ...(permisos?.bitEditar || permisos?.bitEliminar
      ? [
          {
            title: "Acciones",
            render: (_: any, record: any) => (
              <Space>
                {permisos?.bitEditar && (
                  <Button
                    type="link"
                    onClick={() => {
                      setEditing(record);
                      setOpen(true);
                    }}
                  >
                    <EditOutlined />
                  </Button>
                )}

                {permisos?.bitEliminar && (
                  <Popconfirm
                    title="¿Eliminar perfil?"
                    onConfirm={() => handleDelete(record)}
                  >
                    <Button danger type="link">
                      <DeleteOutlined />
                    </Button>
                  </Popconfirm>
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  if (!permisos) return null;

  return (
    <div>
      {/* FILTROS */}
      <div style={{ padding: 10, display: "flex", gap: 10 }}>
        {/* 🔍 BUSCAR */}
        <Input
          placeholder="Buscar perfil..."
          prefix={<SearchOutlined />}
          value={searchPerfil}
          onChange={(e) => setSearchPerfil(e.target.value)}
          allowClear
          style={{ width: 220 }}
        />

        {/* 📊 Super Admin */}
        <Select
          placeholder="Super Admin"
          value={estado}
          onChange={(value) => setEstado(value)}
          allowClear
          style={{ width: 160 }}
          options={[
            { label: "Super Admin", value: "si" },
            { label: "No super admin", value: "no" },
          ]}
        />

        {/* LIMPIAR */}
        <Button
          onClick={() => {
            setSearchPerfil("");
            setEstado(null);
          }}
        >
          <CloseOutlined />
          Limpiar
        </Button>
      </div>

      <div style={{ margin: "16px 0" }}>
        {permisos?.bitAgregar && (
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
        )}
      </div>

      <Table
        scroll={{ x: true }}
        pagination={{ pageSize: 5 }}
        columns={columns}
        //dataSource={perfiles}
        dataSource={filteredPerfiles}
        rowKey="id"
      />

      <PerfilModal
        open={open}
        onClose={() => setOpen(false)}
        onSuccess={fetchPerfiles}
        initialValues={editing}
      />
    </div>
  );
}
