"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";


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

    const statuses = ["Applied", "Interview", "Offer", "Rejected"];

    const groupedJobs = statuses.map(status => ({
        status,
        jobs: jobs.filter(job => job.status === status)
    }));

    const [selectedJob, setSelectedJob] = useState(null);

    const [isOpen, setIsOpen] = useState(false);

    const [newJob, setNewJob] = useState({
        company: "",
        role: "",
        status: "Applied",
    });

    const updateStatus = (id, newStatus) => {
        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === id ? { ...job, status: newStatus } : job
            )
        );
    };

    const handleAddJob = (e) => {
        e.preventDefault();

        const job = {
            id: Date.now(),
            ...newJob,
        };

        setJobs((prev) => [...prev, job]);

        setNewJob({ company: "", role: "", status: "Applied" });
        setIsOpen(false);
    };


    return (
        <main className="board max-w-6xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                    + Add Job
                </button>
            </div>

            {/* Job List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groupedJobs.map((group) => (
                    <div key={group.status} className="bg-gray-50 p-4 rounded-xl">

                        <h2 className="font-bold mb-4">{group.status}</h2>

                        <div className="space-y-4">

                            {group.jobs.length === 0 && (
                                <p className="text-sm text-gray-400 text-center py-6 border border-dashed rounded-lg">
                                    No jobs yet
                                </p>
                            )}

                            {group.jobs.map((job) => (
                                <motion.div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    layout
                                    whileHover={{ scale: 1.02}}
                                    className="bg-white p-4 rounded-xl shadow-sm border flex justify-between items-center cursor-pointer"
                                >
                                    <div>
                                        <h2 className="font-semibold text-lg">{job.role}</h2>
                                        <p className="text-gray-500">{job.company}</p>
                                    </div>

                                    <div className="relative"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <select
                                            value={job.status}
                                            onChange={(e) => updateStatus(job.id, e.target.value)}
                                            className={`border rounded-lg px-3 py-1 pr-8 ml-5 text-sm appearance-none ${job.status === "Applied"
                                                ? "bg-blue-100 text-blue-700"
                                                : job.status === "Interview"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : job.status === "Offer"
                                                        ? "bg-green-100 text-green-700"
                                                        : job.status === "Rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-white text-black"
                                                }`}
                                        >
                                            <option value="Applied">Applied</option>
                                            <option value="Interview">Interview</option>
                                            <option value="Offer">Offer</option>
                                            <option value="Rejected">Rejected</option>
                                        </select>

                                        <span className="text-black text-xs absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                                            ▼
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {isOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-xl w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Add Job</h2>

                        <form onSubmit={handleAddJob} className="flex flex-col gap-4">

                            <input
                                type="text"
                                placeholder="Company"
                                value={newJob.company}
                                onChange={(e) =>
                                    setNewJob({ ...newJob, company: e.target.value })
                                }
                                className="border p-2 rounded-lg"
                                required
                            />

                            <input
                                type="text"
                                placeholder="Role"
                                value={newJob.role}
                                onChange={(e) =>
                                    setNewJob({ ...newJob, role: e.target.value })
                                }
                                className="border p-2 rounded-lg"
                                required
                            />

                            <select
                                value={newJob.status}
                                onChange={(e) =>
                                    setNewJob({ ...newJob, status: e.target.value })
                                }
                                className="border p-2 rounded-lg"
                            >
                                <option>Applied</option>
                                <option>Interview</option>
                                <option>Offer</option>
                                <option>Rejected</option>
                            </select>

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg"
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-white p-6 rounded-xl w-full max-w-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >

                            <h2 className="text-xl font-semibold mb-4">
                                {selectedJob.role}
                            </h2>

                            <p className="text-gray-600 mb-2">
                                <strong>Company:</strong> {selectedJob.company}
                            </p>

                            <p className="text-gray-600 mb-4">
                                <strong>Status:</strong> {selectedJob.status}
                            </p>

                            <div className="flex justify-end">
                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="px-4 py-2 border rounded-lg"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}