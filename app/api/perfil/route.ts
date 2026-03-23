import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

// GET → listar
export async function GET() {
  try {
    await requireAdmin();

    const perfiles = await prisma.perfil.findMany({
      orderBy: { id: "asc" },
    });

    return NextResponse.json(perfiles);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al obtener perfiles" },
      { status: 500 }
    );
  }
}

// POST → crear
export async function POST(req: Request) {
  try {
    await requireAdmin();

    const body = await req.json();

    const nuevo = await prisma.perfil.create({
      data: {
        strNombrePerfil: body.strNombrePerfil,
        bitAdministrador: body.bitAdministrador ?? false,
      },
    });

    return NextResponse.json(nuevo);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al crear perfil" },
      { status: 500 }
    );
  }
}