import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

export async function requireAuth() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      redirect("/login");
    }

    const user = verifyToken(token);

    return user;
  } catch {
    redirect("/login");
  }
}