import { requirePermission } from "@/lib/permissions";
import UsuarioPage from "./UsuarioPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Usuario", "bitConsulta");

  return (
    <MainLayout>
      <UsuarioPage />
    </MainLayout>
  );
}
