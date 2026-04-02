import { requirePermission } from "@/lib/permissions";
import PrincipalDosUnoPage from "./PrincipalDosUnoPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Principal 2.1", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalDosUnoPage />
    </MainLayout>
  );
}