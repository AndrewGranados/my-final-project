import MainLayout from "./MainLayout";
import { getUserPermissions } from "@/lib/getUserPermissions";

export default async function MainLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const permisos = await getUserPermissions();

  return <MainLayout permisos={permisos}>{children}</MainLayout>
}