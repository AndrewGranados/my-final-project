import { requirePermission } from "@/lib/permissions";
import PrincipalDosUnoPage from "./PrincipalDosUnoPage";
import MainLayout from "@/components/layout/MainLayoutWrapper";

export default async function Page() {
  await requirePermission("Usuario", "bitConsulta");

  return (
    <MainLayout>
      <PrincipalDosUnoPage />
    </MainLayout>
  );
}