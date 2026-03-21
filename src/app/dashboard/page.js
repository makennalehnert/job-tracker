"use client";

import { useState } from "react";

export default function Dashboard() {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            company: "Google",
            role: "Frontend Developer",
            status: "Applied",
        },
        {
            id: 2,
            company: "Amazon",
            role: "Full Stack Engineer",
            status: "Interview",
        },
        {
            id: 3,
            company: "Spotify",
            role: "UI Engineer",
            status: "Rejected",
        },
        {
            id: 4,
            company: "Apple",
            role: "Frontend Dev",
            status: "Offer",
        }
    ]);

    const updateStatus = (id, newStatus) => {
        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === id ? { ...job, status: newStatus } : job
            )
        );
    };

    return (
        <main className="max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <button className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                    + Add Job
                </button>
            </div>

            {/* Job List */}
            <div className="grid gap-4">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center"
                    >
                        <div>
                            <h2 className="font-semibold text-lg">{job.role}</h2>
                            <p className="text-gray-500">{job.company}</p>
                        </div>

                        {/* Status Dropdown */}
                        <select
                            value={job.status}
                            onChange={(e) => updateStatus(job.id, e.target.value)}
                            className={`px-3 py-1 ml-5 rounded-full text-sm ${job.status === "Applied"
                                ? "bg-blue-100 text-blue-700"
                                : job.status === "Interview"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : job.status === "Offer"
                                        ? "bg-green-100 text-green-700"
                                    : job.status === "Rejected"
                                        ?  "bg-red-100 text-red-700"
                                        : "bg-white text-black"
                                }`}
                        >
                            <option className="bg-blue-100 text-blue-700"value="Applied">Applied</option>
                            <option className= "bg-yellow-100 text-yellow-700" value="Interview">Interview</option>
                            <option className= "bg-green-100 text-green-700" value="Offer">Offer</option>
                            <option className= "bg-red-100 text-red-700" value="Rejected">Rejected</option>
                        </select>
                    </div>
                ))}
            </div>

        </main>
    );
}