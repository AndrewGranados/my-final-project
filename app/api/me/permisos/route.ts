import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const modulo = searchParams.get("modulo");

  const token = (await cookies()).get("token")?.value;
  const user = verifyToken(token!);

  const perfil = await prisma.perfil.findUnique({
    where: { id: user.perfilId },
  });

  // Validación de administrador
  // admin -> todo
  if (perfil?.bitAdministrador) {
    return NextResponse.json({
      bitAgregar: true,
      bitEditar: true,
      bitEliminar: true,
      bitConsulta: true,
    });
  }

  //Consulta de permisos por módulo
  const permiso = await prisma.permisosPerfil.findFirst({
    where: {
      perfilId: user.perfilId,
      modulo: {
        strNombreModulo: modulo!,
      },
    },
  });

  return NextResponse.json(permiso || {});
}