import { prisma } from "@/lib/prisma";


export async function GET() {
  const jobs = await prisma.job.findMany({
    orderBy: { dateApplied: "desc" },
  });
  return Response.json(jobs);
}

export async function POST(req) {
  const body = await req.json();
  const job = await prisma.job.create({
    data: {
      company: body.company,
      role: body.role,
      status: body.status ?? "Applied",
      dateApplied: new Date(),
    },
  });
  return Response.json(job);
}

export async function PUT(req) {
  const body = await req.json();
  const job = await prisma.job.update({
    where: { id: body.id },
    data: { status: body.status },
  });
  return Response.json(job);
}

export async function DELETE(req) {
  const body = await req.json();
  await prisma.job.delete({
    where: { id: body.id },
  });
  return Response.json({ success: true });
}