import { requireAdmin } from "@/lib/auth";

export default async function PrincipalUnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAdmin();

  return <>{children}</>;
}