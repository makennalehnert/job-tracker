import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return Response.json({ error: "Email already in use" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  if (password.length < 8) {
    return Response.json(
      { error: "Password must be at least 8 characters"},
      { status: 400}
    );
  }

  const user = await prisma.user.create({
    data: { email, password: hashed },
  });

  return Response.json({ id: user.id, email: user.email });
}