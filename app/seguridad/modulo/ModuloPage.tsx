"use client";

//import MainLayout from "@/components/layout/MainLayout";
import ModuloModal from "./ModuloModal";
import { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message } from "antd";

export default function ModuloPage() {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const columns = [
    {
      title: "Nombre",
      dataIndex: "strNombreModulo",
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
            title="¿Eliminar módulo?"
            onConfirm={async () => {
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
    <div>
      <div>
        <h2>Módulos</h2>

        <Button
          type="primary"
          style={{ marginBottom: 16 }}
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          Nuevo módulo
        </Button>

        <Table
          rowKey="id"
          columns={columns}
          dataSource={data}
          loading={loading}
        />

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
