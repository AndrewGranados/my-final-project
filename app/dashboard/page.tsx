import { requirePermission } from "@/lib/permissions";
import MainLayout from "@/components/layout/MainLayoutWrapper";
import DashboardPage from "./DashboardPage";
import { requireAuth } from "@/lib/auth";

export default async function Page() {
  const user = await requireAuth(); // 👈 aquí lo obtienes

  await requirePermission("Módulo", "bitConsulta");

  return (
    <MainLayout>
      <DashboardPage user={user} />
    </MainLayout>
  );
}