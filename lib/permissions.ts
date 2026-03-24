import prisma from "@/lib/prisma";
import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function requirePermission(
  moduloNombre: string,
  accion: "bitAgregar" | "bitEditar" | "bitConsulta" | "bitEliminar" | "bitDetalle"
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("No autenticado");

  const user = verifyToken(token);

  if (!user) throw new Error("Token inválido");

  // obtener perfil
  const perfil = await prisma.perfil.findUnique({
    where: { id: user.perfilId },
  });

  // si es admin → acceso total
  if (perfil?.bitAdministrador) return true;

  // buscar módulo
  const modulo = await prisma.modulo.findFirst({
    where: { strNombreModulo: moduloNombre },
  });

  if (!modulo) throw new Error("Módulo no existe");

  // buscar permiso
  const permiso = await prisma.permisosPerfil.findUnique({
    where: {
      perfilId_moduloId: {
        perfilId: user.perfilId,
        moduloId: modulo.id,
      },
    },
  });

  if (!permiso || !permiso[accion]) {
    throw new Error("Sin permisos");
  }

  return true;
}