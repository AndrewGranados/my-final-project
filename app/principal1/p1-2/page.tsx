import { requirePermission } from "@/lib/permissions";
import PrincipalUnoDosPage from "./PrincipalUnoDosPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Usuario", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalUnoDosPage />
    </MainLayout>
  );
}