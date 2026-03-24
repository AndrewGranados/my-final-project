import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/jwt";

/*export async function requireAdmin() {

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = verifyToken(token);

    if (!user.admin) {
      redirect("/login");
    }

    return user;

  } catch {
    redirect("/login");
  }
}
*/

/*
export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    const user = verifyToken(token);
    return user;
  } catch {
    redirect("/login");
  }
}
*/

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