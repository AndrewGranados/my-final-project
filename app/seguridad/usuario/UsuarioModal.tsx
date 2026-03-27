"use client";

import { Modal, Form, Input, Select, message, Upload, Button } from "antd";
import { useEffect, useState } from "react";
import { UploadOutlined } from "@ant-design/icons";

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
      form.setFieldsValue({
        ...initialValues,
        strPwd: "",
      });
    } else {
      form.resetFields();
    }

    if (initialValues?.imagenUrl) {
      form.setFieldsValue({
        imagen: [
          {
            uid: "-1",
            name: "imagen",
            status: "done",
            url: initialValues.imagenUrl,
          },
        ],
      });
    }
  }, [open, initialValues]);
  /*
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
*/

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const url = isEdit ? `/api/usuario/${initialValues.id}` : "/api/usuario";

      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error();

      message.success(isEdit ? "Usuario actualizado" : "Usuario creado");

      form.resetFields();
      onClose();
      onSuccess();
    } catch {
      message.error("Error al guardar");
    }
  };

  return open ? (
    <Modal
      title={isEdit ? "Editar Usuario" : "Nuevo Usuario"}
      open={open}
      destroyOnClose
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        {/* USUARIO */}
        <Form.Item
          label="Usuario"
          name="strNombreUsuario"
          rules={[
            { required: true, message: "El usuario es obligatorio" },
            { max: 20, message: "Máximo 20 caracteres" },
          ]}
        >
          <Input maxLength={20} />
        </Form.Item>

        {/* CORREO */}
        <Form.Item
          label="Correo"
          name="strCorreo"
          rules={[
            { required: true, message: "El correo es obligatorio" },
            { type: "email", message: "Ingresa un correo válido" },
          ]}
        >
          <Input />
        </Form.Item>

        {/* TELÉFONO */}
        <Form.Item
          label="Teléfono"
          name="strNumeroCelular"
          rules={[
            { required: true, message: "El teléfono es obligatorio" },
            {
              pattern: /^\d{10}$/,
              message: "Debe contener exactamente 10 dígitos",
            },
          ]}
        >
          <Input maxLength={10} />
        </Form.Item>

        {/* CONTRASEÑA */}
        <Form.Item
          label={isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
          name="strPwd"
          rules={[
            {
              required: !isEdit,
              message: "La contraseña es obligatoria",
            },
          ]}
        >
          <Input.Password
            placeholder={isEdit ? "Dejar vacío para no cambiar" : ""}
          />
        </Form.Item>

        {/* PERFIL */}
        <Form.Item
          label="Perfil"
          name="perfilId"
          rules={[{ required: true, message: "Selecciona un perfil" }]}
        >
          <Select
            placeholder="Selecciona un perfil"
            options={perfiles.map((p: any) => ({
              label: p.strNombrePerfil,
              value: p.id,
            }))}
          />
        </Form.Item>

        {/* IMAGEN */}
        <Form.Item
          label="Imagen de usuario"
          name="imagen"
          valuePropName="fileList"
          getValueFromEvent={(e) => e.fileList}
        >
          <Upload
            customRequest={async ({ file, onSuccess, onError }) => {
              const formData = new FormData();
              formData.append("file", file as File);
              formData.append(
                "upload_preset",
                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!,
              );

              try {
                const res = await fetch(
                  `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
                  {
                    method: "POST",
                    body: formData,
                  },
                );

                const data = await res.json();

                // Guardas la URL en el form
                form.setFieldsValue({
                  imagenUrl: data.secure_url,
                });

                onSuccess?.(data);
                message.success("Imagen subida correctamente");
              } catch (err) {
                onError?.(err as any);
              }
            }}
            maxCount={1}
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>Subir imagen</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="imagenUrl" hidden>
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  ) : null;
}
