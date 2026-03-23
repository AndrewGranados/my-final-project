"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useEffect, useState } from "react";
import { Table, Select, Checkbox, Button, message } from "antd";

export default function PermisosPerfilPage() {
  const [perfiles, setPerfiles] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [permisos, setPermisos] = useState<any[]>([]);
  const [perfilId, setPerfilId] = useState<number | null>(null);

  // cargar perfiles
  const fetchPerfiles = async () => {
    const res = await fetch("/api/perfil");
    const data = await res.json();
    setPerfiles(data);
  };

  // cargar módulos
  const fetchModulos = async () => {
    const res = await fetch("/api/modulo");
    const data = await res.json();
    setModulos(data);
  };

  // cargar permisos del perfil
  const fetchPermisos = async (id: number) => {
    const res = await fetch(`/api/permisos-perfil?perfilId=${id}`);
    const data = await res.json();

    // mapear módulos + permisos
    const permisosMap = modulos.map((m: any) => {
      const permiso = data.find((p: any) => p.moduloId === m.id);

      return {
        moduloId: m.id,
        strNombreModulo: m.strNombreModulo,
        bitAgregar: permiso?.bitAgregar || false,
        bitEditar: permiso?.bitEditar || false,
        bitConsulta: permiso?.bitConsulta || false,
        bitEliminar: permiso?.bitEliminar || false,
        bitDetalle: permiso?.bitDetalle || false,
      };
    });

    setPermisos(permisosMap);
  };

  useEffect(() => {
    fetchPerfiles();
    fetchModulos();
  }, []);

  // cuando cambia perfil
  useEffect(() => {
    if (perfilId && modulos.length > 0) {
      fetchPermisos(perfilId);
    }
  }, [perfilId, modulos]);

  // cambiar checkbox
  const handleChange = (index: number, field: string, value: boolean) => {
    const newData = [...permisos];
    newData[index][field] = value;
    setPermisos(newData);
  };

  // guardar
  const handleSave = async () => {
    try {
      const res = await fetch("/api/permisos-perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          perfilId,
          permisos,
        }),
      });

      if (!res.ok) throw new Error();

      message.success("Permisos guardados");
    } catch {
      message.error("Error al guardar");
    }
  };

  const columns = [
    {
      title: "Módulo",
      dataIndex: "strNombreModulo",
    },
    {
      title: "Crear",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          checked={record.bitAgregar}
          onChange={(e) =>
            handleChange(index, "bitAgregar", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Editar",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          checked={record.bitEditar}
          onChange={(e) =>
            handleChange(index, "bitEditar", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Ver",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          checked={record.bitConsulta}
          onChange={(e) =>
            handleChange(index, "bitConsulta", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Eliminar",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          checked={record.bitEliminar}
          onChange={(e) =>
            handleChange(index, "bitEliminar", e.target.checked)
          }
        />
      ),
    },
    {
      title: "Detalle",
      render: (_: any, record: any, index: number) => (
        <Checkbox
          checked={record.bitDetalle}
          onChange={(e) =>
            handleChange(index, "bitDetalle", e.target.checked)
          }
        />
      ),
    },
  ];

  return (
    <MainLayout>
      <h2>Permisos por Perfil</h2>

      {/* SELECT PERFIL */}
      <Select
        placeholder="Selecciona un perfil"
        style={{ width: 300, marginBottom: 20 }}
        onChange={(value) => setPerfilId(value)}
        options={perfiles.map((p: any) => ({
          label: p.strNombrePerfil,
          value: p.id,
        }))}
      />

      {/* TABLA */}
      <Table
        rowKey="moduloId"
        columns={columns}
        dataSource={permisos}
        pagination={false}
      />

      {/* BOTÓN */}
      <Button
        type="primary"
        style={{ marginTop: 16 }}
        onClick={handleSave}
        disabled={!perfilId}
      >
        Guardar permisos
      </Button>
    </MainLayout>
  );
}