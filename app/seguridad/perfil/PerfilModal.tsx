"use client";

import { Modal, Form, Input, Checkbox, message } from "antd";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: any;
}

export default function PerfilModal({
  open,
  onClose,
  onSuccess,
  initialValues,
}: Props) {
  const [form] = Form.useForm();

  const isEdit = !!initialValues;

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || { bitAdministrador: false });
    }
  }, [open, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const url = isEdit
        ? `/api/perfil/${initialValues.id}`
        : "/api/perfil";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Error");
      }

      message.success(isEdit ? "Perfil actualizado" : "Perfil creado");

      form.resetFields();
      onClose();
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Error");
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar perfil" : "Nuevo perfil"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
      okText={isEdit ? "Actualizar" : "Crear"}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nombre del perfil"
          name="strNombrePerfil"
          rules={[
            { required: true, message: "El nombre es obligatorio" },
            { max: 50, message: "Máximo 50 caracteres" },
          ]}
        >
          <Input placeholder="Ej: Administrador" />
        </Form.Item>

        <Form.Item
          name="bitAdministrador"
          valuePropName="checked"
        >
          <Checkbox>Es administrador</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}