import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function getUserPermissions() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return [];

  const user = verifyToken(token);

  const perfil = await prisma.perfil.findUnique({
    where: { id: user.perfilId },
  });

  // admin → todo
  if (perfil?.bitAdministrador) {
    const modulos = await prisma.modulo.findMany();
    return modulos.map((m) => m.strNombreModulo);
  }

  const permisos = await prisma.permisosPerfil.findMany({
    where: {
      perfilId: user.perfilId,
      bitConsulta: true,
    },
    include: {
      modulo: true,
    },
  });

  return permisos.map((p) => p.modulo.strNombreModulo);
}