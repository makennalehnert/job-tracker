"use client";
import JobCard from "./JobCard";

const Column = ({ status, jobs = [], setSelectedJob, updateStatus, deleteJob }) => {
    return (
        <section
            aria-label={`${status} jobs, ${jobs.length} ${jobs.length === 1 ? "job" : "jobs"}`}
            className="bg-white p-4 rounded-xl shadow"
        >
            <h2 className="font-bold mb-4" id={`column-${status}`}>
                {status}
                <span className="sr-only"> — {jobs.length} {jobs.length === 1 ? "job" : "jobs"}</span>
            </h2>

            {jobs.length === 0 ? (
                <div
                    role="status"
                    aria-live="polite"
                    className="text-gray-400 text-sm text-center py-6 border border-dashed rounded-lg"
                >
                    No jobs
                </div>
            ) : (
                <ul
                    aria-labelledby={`column-${status}`}
                    className="list-none p-0 m-0"
                >
                    {jobs.map((job) => (
                        <li key={job.id}>
                            <JobCard
                                job={job}
                                setSelectedJob={setSelectedJob}
                                updateStatus={updateStatus}
                                deleteJob={deleteJob}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default Column;