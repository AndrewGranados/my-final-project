"use client";

import {
  Table,
  Button,
  Popconfirm,
  Space,
  message,
  Input,
  Avatar,
  Typography,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  CloseOutlined,
  NumberOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import UsuarioModal from "./UsuarioModal";
import { usePermissions } from "@/lib/usePermissions";

export default function PrincipalDosDosPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [editing, setEditing] = useState<any>(null);
  const [filtros, setFiltros] = useState({
    usuario: "",
    correo: "",
    celular: "",
    perfil: "",
  });
  const [open, setOpen] = useState(false);
  const { Text } = Typography;

  // ✅ puedes dejarlo o mockearlo después
  const fetchUsuarios = async () => {
    const res = await fetch("/api/usuario");
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const permisos = usePermissions("Usuario");
  if (!permisos) return null;

  const handleDelete = (record: any) => {
    message.success(`(Simulado) Usuario "${record.strNombreUsuario}" eliminado`);
  };

  const filteredUsuarios = usuarios.filter((u: any) => {
    return (
      u.strNombreUsuario
        ?.toLowerCase()
        .includes(filtros.usuario.toLowerCase()) &&
      u.strCorreo?.toLowerCase().includes(filtros.correo.toLowerCase()) &&
      u.strNumeroCelular
        ?.toLowerCase()
        .includes(filtros.celular.toLowerCase()) &&
      u.perfil?.strNombrePerfil
        ?.toLowerCase()
        .includes(filtros.perfil.toLowerCase())
    );
  });

  const columns = [
    {
      title: "Usuario",
      render: (record: any) => (
        <Space>
          <Avatar src={record.imagenUrl} size={48}>
            {record.strNombreUsuario?.charAt(0)}
          </Avatar>
          <Text strong>{record.strNombreUsuario}</Text>
        </Space>
      ),
    },
    {
      title: "Contacto",
      render: (record: any) => (
        <div>
          <Text>{record.strCorreo}</Text>
          <br />
          <Text type="secondary">{record.strNumeroCelular}</Text>
        </div>
      ),
    },
    {
      title: "Perfil",
      render: (r: any) => (
        <Text>{r.perfil?.strNombrePerfil || "Sin perfil"}</Text>
      ),
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
                    title="¿Eliminar usuario?"
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

  return (
    <div>
      {/* FILTROS */}
      <div style={{ padding: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Input
          placeholder="Usuario"
          prefix={<SearchOutlined />}
          value={filtros.usuario}
          onChange={(e) => setFiltros({ ...filtros, usuario: e.target.value })}
          style={{width:180}}
          />

        <Input
          placeholder="Correo"
          prefix={<MailOutlined />}
          value={filtros.correo}
          onChange={(e) => setFiltros({ ...filtros, correo: e.target.value })}
          style={{width:180}}
          />

        <Input
          placeholder="Celular"
          prefix={<NumberOutlined />}
          value={filtros.celular}
          onChange={(e) => setFiltros({ ...filtros, celular: e.target.value })}
          style={{width:180}}
        />

        <Button
          onClick={() =>
            setFiltros({
              usuario: "",
              correo: "",
              celular: "",
              perfil: "",
            })
          }
        >
          <CloseOutlined /> Limpiar
        </Button>
      </div>

      {/* BOTÓN */}
      {permisos?.bitAgregar && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Nuevo
        </Button>
      )}

      {/* TABLA */}
      <Table columns={columns} dataSource={filteredUsuarios} rowKey="id" style={{paddingBottom: 20}}/>

      {/* MODAL */}
      <UsuarioModal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditing(null);
        }}
        onSuccess={() => {
          message.success("(Simulado) Guardado");
          setOpen(false);
        }}
        initialValues={editing}
      />
    </div>
  );
}