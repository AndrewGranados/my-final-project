"use client";

import { Modal, Form, Input, Select, message } from "antd";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: any;
}

export default function UsuarioModal({
  open,
  onClose,
  onSuccess,
  initialValues,
}: Props) {
  const [form] = Form.useForm();
  const [perfiles, setPerfiles] = useState([]);

  const isEdit = !!initialValues;

  const fetchPerfiles = async () => {
    const res = await fetch("/api/perfil");
    const data = await res.json();
    setPerfiles(data);
  };

  useEffect(() => {
    fetchPerfiles();
  }, []);

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || {});
    }
  }, [open, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const res = await fetch("/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      message.success("Usuario creado");

      form.resetFields();
      onClose();
      onSuccess();
    } catch {
      message.error("Error al guardar");
    }
  };

  return (
    <Modal
      title="Nuevo Usuario"
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Usuario"
          name="strNombreUsuario"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Correo"
          name="strCorreo"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="strNumeroCelular"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Contraseña"
          name="strPwd"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Perfil"
          name="perfilId"
          rules={[{ required: true }]}
        >
          <Select
            options={perfiles.map((p: any) => ({
              label: p.strNombrePerfil,
              value: p.id,
            }))}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}