import { requirePermission } from "@/lib/permissions";
import ModuloPage from "./ModuloPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Módulo", "bitConsulta");

  return (
    <MainLayout>
      <ModuloPage />;
    </MainLayout>
  );
}
