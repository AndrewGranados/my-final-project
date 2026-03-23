/*
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ✏️ EDITAR
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const id = Number(params.id);
    const body = await req.json();

    const actualizado = await prisma.modulo.update({
      where: { id },
      data: {
        strNombreModulo: body.strNombreModulo,
      },
    });

    return NextResponse.json(actualizado);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar módulo" },
      { status: 500 }
    );
  }
}

// 🗑 ELIMINAR
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const id = Number(params.id);

    await prisma.modulo.delete({
      where: { id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar módulo" },
      { status: 500 }
    );
  }
}
*/

/*
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ✏️ EDITAR
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const id = Number(params.id);
    const body = await req.json();

    console.log("UPDATE ID:", id);
    console.log("BODY:", body);

    const actualizado = await prisma.modulo.update({
      where: { id },
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

// 🗑 ELIMINAR
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await requireAdmin();

    const id = Number(params.id);

    console.log("DELETE ID:", id);

    await prisma.modulo.delete({
      where: { id },
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
*/

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// ✏️ EDITAR
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await context.params; // 🔥 FIX
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

// 🗑 ELIMINAR
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await context.params; // 🔥 FIX

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