import { requirePermission } from "@/lib/permissions";
import PrincipalUnoUnoPage from "./PrincipalUnoUnoPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Usuario", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalUnoUnoPage />
    </MainLayout>
  );
}