import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// GET → obtener permisos por perfil
export async function GET(req: Request) {
  try {
    await requireAuth();

    const { searchParams } = new URL(req.url);
    const perfilId = Number(searchParams.get("perfilId"));

    if (!perfilId) {
      return NextResponse.json(
        { error: "perfilId requerido" },
        { status: 400 }
      );
    }

    const permisos = await prisma.permisosPerfil.findMany({
      where: { perfilId },
      include: {
        modulo: true,
      },
    });

    return NextResponse.json(permisos);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener permisos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAuth();

    const body = await req.json();

    const { perfilId, permisos } = body;

    // borrar anteriores
    await prisma.permisosPerfil.deleteMany({
      where: { perfilId },
    });

    // crear nuevos
    await prisma.permisosPerfil.createMany({
      data: permisos.map((p: any) => ({
        perfilId,
        moduloId: p.moduloId,
        bitAgregar: p.bitAgregar,
        bitEditar: p.bitEditar,
        bitConsulta: p.bitConsulta,
        bitEliminar: p.bitEliminar,
        bitDetalle: p.bitDetalle,
      })),
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al guardar permisos" },
      { status: 500 }
    );
  }
}