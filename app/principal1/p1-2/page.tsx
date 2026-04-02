import { requirePermission } from "@/lib/permissions";
import PrincipalUnoDosPage from "./PrincipalUnoDosPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Principal 1.2", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalUnoDosPage />
    </MainLayout>
  );
}