"use client";
import JobCard from "./JobCard";


const Column = ({ status, jobs = [], setSelectedJob, updateStatus }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-xl">
            <h2 className="font-bold mb-4">{status}</h2>

            {jobs.length === 0 ? (
                <div className="text-gray-400 text-sm text-center py-6 border border-dashed rounded-lg">
                    No jobs
                </div>
            ) : (
                jobs.map((job) => (
                    <JobCard
                        key={job.id}
                        job={job}
                        setSelectedJob={setSelectedJob}
                        updateStatus={updateStatus}
                    />
                ))
            )}
        </div>
    );
};

export default Column; 