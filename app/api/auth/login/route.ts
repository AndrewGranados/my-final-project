import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

export async function POST(req: Request) {
  try {
    const { usuario, password } = await req.json();

    const user = await prisma.usuario.findUnique({
      where: {
        strNombreUsuario: usuario,
      },
      include: {
        perfil: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 401 }
      );
    }

    if (!user.idEstadoUsuario) {
      return NextResponse.json(
        { message: "Usuario inactivo" },
        { status: 403 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.strPwd);

    if (!validPassword) {
      return NextResponse.json(
        { message: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user.id,
      usuario: user.strNombreUsuario,
      perfilId: user.perfilId,
      admin: user.perfil.bitAdministrador,
    });

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        usuario: user.strNombreUsuario,
        perfil: user.perfil.strNombrePerfil,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error en login" },
      { status: 500 }
    );
  }
}