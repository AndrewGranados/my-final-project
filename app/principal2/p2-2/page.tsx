import { requirePermission } from "@/lib/permissions";
import PrincipalDosDosPage from "./PrincipalDosDosPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Principal 2.2", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalDosDosPage />
    </MainLayout>
  );
}