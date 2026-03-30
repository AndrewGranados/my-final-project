import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// EDITAR
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params; 
    const body = await req.json();

    const actualizado = await prisma.modulo.update({
      where: { id: Number(id) },
      data: {
        strNombreModulo: body.strNombreModulo,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error: any) {
    console.error("ERROR UPDATE:", error);

    return NextResponse.json(
      { error: error.message || "Error al actualizar módulo" },
      { status: 500 }
    );
  }
}

// ELIMINAR
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAuth();

    const { id } = await context.params;

    await prisma.modulo.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ ok: true });
  } catch (error: any) {
    console.error("ERROR DELETE:", error);

    return NextResponse.json(
      { error: error.message || "Error al eliminar módulo" },
      { status: 500 }
    );
  }
}