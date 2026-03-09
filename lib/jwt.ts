import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
  id: number;
  usuario: string;
  perfilId: number;
  admin: boolean;
}

export function generateToken(payload: JwtPayload){
  return jwt.sign(payload, SECRET,{
    expiresIn: "8h",
  });
}

export function verifyToken(token: string){
  return jwt.verify(token, SECRET) as JwtPayload;
}