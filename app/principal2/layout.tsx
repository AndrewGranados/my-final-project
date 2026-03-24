import { requireAuth } from "@/lib/auth";

export default async function PrincipalDosLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAuth();

  return <>{children}</>;
}