//import { requireAdmin } from "@/lib/auth";
import { requireAuth } from "@/lib/auth";

export default async function SeguridadLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  await requireAuth();

  return <>{children}</>;
}