import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { generateToken } from "@/lib/jwt";

// 🔥 función para validar recaptcha
async function verifyRecaptcha(token: string) {
  const res = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
    }
  );

  return res.json();
}

//POST PARA LOGUEARTE
export async function POST(req: Request) {
  try {
    const { usuario, password, recaptchaToken } = await req.json();

    // 🔥 VALIDAR RECAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json(
        { message: "Falta validar reCAPTCHA" },
        { status: 400 }
      );
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken);

    if (!recaptcha.success) {
      return NextResponse.json(
        { message: "reCAPTCHA inválido" },
        { status: 400 }
      );
    }

    // Consulta a base de datos
    const user = await prisma.usuario.findUnique({
      where: {
        strNombreUsuario: usuario,
      },
      include: {
        perfil: true,
      },
    });

    // Validaciones de usuario
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

    // Generación de JWT
    // - Manejo de roles 
    // - Autenticación basada en tokens
    const token = generateToken({
      id: user.id,
      usuario: user.strNombreUsuario,
      perfilId: user.perfilId,
      admin: user.perfil.bitAdministrador,
    });

    const response = NextResponse.json({
      message: "Login exitoso",
      user: {
        id: user.id,
        usuario: user.strNombreUsuario,
        perfil: user.perfil.strNombrePerfil,
      },
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    return response;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Error en login" },
      { status: 500 }
    );
  }
}