import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const modulos = await prisma.modulo.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(modulos);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener módulos" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();

    const nuevo = await prisma.modulo.create({
      data: {
        strNombreModulo: body.strNombreModulo,
      },
    });

    return NextResponse.json(nuevo);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear módulo" },
      { status: 500 }
    );
  }
}