import { requireAdmin } from "@/lib/auth";

export default async function PrincipalDosLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAdmin();

  return <>{children}</>;
}