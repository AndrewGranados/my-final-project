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

  // ✅ CONSULTA REAL (puedes dejarla)
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
      form.setFieldsValue({
        ...initialValues,
        strPwd: "",
      });
    } else {
      form.resetFields();
    }
  }, [open, initialValues]);

  // ❌ SOLO SIMULA
  const handleSubmit = async () => {
    try {
      await form.validateFields();

      message.success(
        isEdit
          ? "(Simulado) Usuario actualizado"
          : "(Simulado) Usuario creado"
      );

      form.resetFields();
      onClose();
      onSuccess();
    } catch {
      message.error("Revisa los campos");
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar Usuario" : "Nuevo Usuario"}
      open={open}
      onCancel={onClose}
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
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Teléfono"
          name="strNumeroCelular"
          rules={[{ required: true }]}
        >
          <Input />
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