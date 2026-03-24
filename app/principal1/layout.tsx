import { requireAuth } from "@/lib/auth";

export default async function PrincipalUnoLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAuth();

  return <>{children}</>;
}