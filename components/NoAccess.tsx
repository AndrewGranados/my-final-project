"use client";

import { Result, Button } from "antd";
import { useRouter } from "next/navigation";

export default function NoAccess() {
  const router = useRouter();

  return (
    <Result
      status="403"
      title="403"
      subTitle="No tienes permisos para acceder a esta página."
      extra={
        <Button type="primary" onClick={() => router.push("/dashboard")}>
          Regresar
        </Button>
      }
    />
  );
}