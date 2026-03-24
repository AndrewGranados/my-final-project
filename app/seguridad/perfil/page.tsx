import { requirePermission } from "@/lib/permissions";
import PerfilPage from "./PerfilPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Perfil", "bitConsulta");
  return (
    <MainLayout>
      <PerfilPage />
    </MainLayout>
  );
}
