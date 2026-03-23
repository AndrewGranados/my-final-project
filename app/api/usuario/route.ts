import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

//GET USUSARIOS
export async function GET() {
  const usuarios = await prisma.usuario.findMany({
    include: {
      perfil: true,
    },
  });

  return NextResponse.json(usuarios);
}

//POST USUARIOS
export async function POST(req: Request) {
  const data = await req.json();

  const hashedPassword = await bcrypt.hash(data.strPwd, 10);
  
  const user = await prisma.usuario.create({
    data: {
      strNombreUsuario: data.strNombreUsuario,
      strPwd: hashedPassword,
      strCorreo: data.strCorreo,
      strNumeroCelular: data.strNumeroCelular,
      idEstadoUsuario: true,
      perfilId: data.perfilId,
    },
  });
}