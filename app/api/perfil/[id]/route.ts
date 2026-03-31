import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// PUT
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;
    const body = await req.json();

    const actualizado = await prisma.perfil.update({
      where: { id: Number(id) },
      data: {
        strNombrePerfil: body.strNombrePerfil,
        bitAdministrador: body.bitAdministrador,
        bitActivo: body.bitActivo,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al actualizar perfil" },
      { status: 500 }
    );
  }
}

// DELETE
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    await prisma.perfil.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar perfil" },
      { status: 500 }
    );
  }
}