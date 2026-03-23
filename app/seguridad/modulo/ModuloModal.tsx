"use client";

import { Modal, Form, Input, message } from "antd";
import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialValues?: any;
}

export default function ModuloModal({
  open,
  onClose,
  onSuccess,
  initialValues,
}: Props) {
  const [form] = Form.useForm();

  const isEdit = !!initialValues;

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues || {});
    }
  }, [open, initialValues]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const url = isEdit ? `/api/modulo/${initialValues.id}` : "/api/modulo";

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

      message.success(isEdit ? "Módulo actualizado" : "Módulo creado");

      form.resetFields();
      onClose();
      onSuccess();
    } catch (error: any) {
      message.error(error.message || "Error");
    }
  };

  return (
    <Modal
      title={isEdit ? "Editar módulo" : "Nuevo módulo"}
      open={open}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
      okText={isEdit ? "Actualizar" : "Crear"}
      cancelText="Cancelar"
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Nombre del módulo"
          name="strNombreModulo"
          rules={[
            { required: true, message: "El nombre es obligatorio" },
            { max: 50, message: "Máximo 50 caracteres" },
          ]}
        >
          <Input placeholder="Ej: Usuarios" />
        </Form.Item>
      </Form>
    </Modal>
  );
}
