"use client";

//import MainLayout from "@/components/layout/MainLayout";
import ModuloModal from "./ModuloModal";
import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { usePermissions } from "@/lib/usePermissions";

export default function ModuloPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchModulo, setSearchModulo] = useState("");
  
  const permisos = usePermissions("Módulo");

  const fetchModulos = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/modulo");

      if (!res.ok) throw new Error("Error al obtener módulos");

      const result = await res.json();
      setData(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchModulos();
  }, []);

  const handleDelete = async (record: any) => {
    try {
      const res = await fetch(`/api/modulo/${record.id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      message.success("Módulo eliminado");
      fetchModulos();
    } catch {
      message.error("Error al eliminar");
    }
  };

  const filteredModulos = data.filter((u: any) => {
    const matchNombre = u.strNombreModulo
      ?.toLowerCase()
      .includes(searchModulo.toLowerCase());

    return matchNombre;
  });

  const columns = [
    {
      title: "Nombre",
      dataIndex: "strNombreModulo",
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
                    title="¿Eliminar módulo?"
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
      <div>
        {/* FILTROS */}
        <div style={{ padding: 10, display: "flex", gap: 10 }}>
          {/* BUSCAR */}
          <Input
            placeholder="Buscar módulo..."
            prefix={<SearchOutlined />}
            value={searchModulo}
            onChange={(e) => setSearchModulo(e.target.value)}
            allowClear
            style={{ width: 220 }}
          />
        </div>

        <div style={{ marginBottom: 16 }}>
          {permisos?.bitAgregar && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditing(null);
                setOpen(true);
              }}
            >
              Nuevo módulo
            </Button>
          )}
        </div>

        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Table
            scroll={{ x: true }}
            rowKey="id"
            columns={columns}
            //dataSource={data}
            dataSource={filteredModulos}
            loading={loading}
          />
        </div>

        <ModuloModal
          open={open}
          onClose={() => setOpen(false)}
          onSuccess={fetchModulos}
          initialValues={editing}
        />
      </div>
    </div>
  );
}
