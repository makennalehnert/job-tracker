

let jobs = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Dev",
    status: "Applied",
    dateApplied: "2026-03-26T18:30:00.000Z"
  },
];

// ✅ GET all jobs
export async function GET() {
  return Response.json(jobs);
}

// ✅ CREATE a job
export async function POST(req) {
  const body = await req.json();

  const newJob = {
    id: Date.now(),
    ...body,
  };

  jobs.push(newJob);

  return Response.json(newJob);
}

// ✅ UPDATE a job
export async function PUT(req) {
  const body = await req.json();

  const index = jobs.findIndex((job) => job.id === body.id);

  if (index === -1) {
    return Response.json({ error: "Job not found" }, { status: 404 });
  }

  jobs[index] = { ...jobs[index], ...body };

  return Response.json(jobs[index]);
}

// ✅ DELETE a job
export async function DELETE(req) {
  const body = await req.json();

  jobs = jobs.filter((job) => job.id !== body.id);

  return Response.json({ success: true });
}