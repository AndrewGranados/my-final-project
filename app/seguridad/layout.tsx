import { requireAdmin } from "@/lib/auth";

export default async function SeguridadLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAdmin();

  return <>{children}</>;
}