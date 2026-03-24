import { requirePermission } from "@/lib/permissions";
import PermisosPerfilPage from "./PermisosPerfilPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Permisos Perfil", "bitConsulta");
  return (
    <MainLayout>
      <PermisosPerfilPage />
    </MainLayout>
  );
}
