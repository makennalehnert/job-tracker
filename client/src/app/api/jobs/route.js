import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const jobs = await prisma.job.findMany({
    where: { userId: Number(session.user.id) },
    orderBy: { dateApplied: "desc" },
  });
  return Response.json(jobs);
}

export async function POST(req) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const job = await prisma.job.create({
    data: {
      company: body.company,
      role: body.role,
      status: body.status ?? "Applied",
      dateApplied: new Date(),
      userId: Number(session.user.id),
    },
  });
  return Response.json(job);
}

export async function PUT(req) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const job = await prisma.job.update({
    where: { id: body.id, userId: Number(session.user.id) },
    data: { status: body.status },
  });
  return Response.json(job);
}

export async function DELETE(req) {
  const session = await auth();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await prisma.job.delete({
    where: { id: body.id, userId: Number(session.user.id) },
  });
  return Response.json({ success: true });
}