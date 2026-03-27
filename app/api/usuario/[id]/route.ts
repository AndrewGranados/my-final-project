import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 

  try {
    const data = await req.json();

    let updateData: any = {
      strNombreUsuario: data.strNombreUsuario,
      strCorreo: data.strCorreo,
      strNumeroCelular: data.strNumeroCelular,
      perfilId: data.perfilId,
      imagenUrl: data.imagenUrl || null,
    };

    if (data.strPwd) {
      updateData.strPwd = await bcrypt.hash(data.strPwd, 10);
    }

    const user = await prisma.usuario.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al actualizar" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  try {
    await prisma.usuario.delete({
      where: { id: Number(id) },
    });

    return NextResponse.json({ message: "Usuario eliminado" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error al eliminar" },
      { status: 500 }
    );
  }
}