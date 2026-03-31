import { requirePermission } from "@/lib/permissions";
import PrincipalUnoUnoPage from "./PrincipalUnoUnoPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Principal 1.1", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalUnoUnoPage />
    </MainLayout>
  );
}