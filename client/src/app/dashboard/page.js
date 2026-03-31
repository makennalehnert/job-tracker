"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Column from "@/components/Column";
import JobCard from "@/components/JobCard";



export default function Dashboard() {
    const [jobs, setJobs] = useState([
        {
            id: 1,
            company: "Google",
            role: "Frontend Developer",
            status: "Applied",
            dateApplied: "2026-03-26T18:30:00.000Z"
        },
        {
            id: 2,
            company: "Amazon",
            role: "Full Stack Engineer",
            status: "Interview",
            dateApplied: "2026-03-24T18:30:00.000Z"
        },
        {
            id: 3,
            company: "Spotify",
            role: "UI Engineer",
            status: "Rejected",
            dateApplied: "2026-03-20T18:30:00.000Z"
        },
        {
            id: 4,
            company: "Apple",
            role: "Frontend Dev",
            status: "Offer",
            dateApplied: "2026-03-21T18:30:00.000Z"
        }
    ]);

    const statuses = ["Applied", "Interview", "Offer", "Rejected"];

    const sortedJobs = [...jobs].sort(
        (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
    )

    const groupedJobs = statuses.map(status => ({
        status,
        jobs: sortedJobs.filter(job => job.status === status)
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
            dateApplied: new Date().toISOString(),
            ...newJob,
        };

        setJobs((prev) => [...prev, job]);

        setNewJob({ company: "", role: "", status: "Applied" });
        setIsOpen(false);
    };


    return (
        <main className="board max-w-7xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.03 }}
                    className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-800 transition">
                    + Add Job
                </motion.button>
            </div>

            {/* Job List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {groupedJobs.map((group) => (
                    <Column
                        key={group.status}
                        status={group.status}
                        jobs={group.jobs}
                        setSelectedJob={setSelectedJob}
                        updateStatus={updateStatus}
                    >
                        {group.jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                job={job}
                                setSelectedJob={setSelectedJob}
                                updateStatus={updateStatus}
                            />
                        ))}
                    </Column>
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
                                <motion.button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.03 }}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Cancel
                                </motion.button>

                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer"
                                >
                                    Add
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center"
                        onClick={() => setSelectedJob(null)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}

                    >
                        <motion.div
                            className="bg-white p-6 rounded-xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
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

                            <p className="text-gray-600 mb-2">
                                <strong>Status:</strong> {selectedJob.status}
                            </p>

                            <p className="text-gray-600 mb-4">
                                <strong>Date Applied:</strong> {new Date(selectedJob.dateApplied).toLocaleDateString()}
                            </p>

                            <div className="flex justify-end">
                                <motion.button
                                    onClick={() => setSelectedJob(null)}
                                    whileHover={{ scale: 1.03 }}
                                    className="px-4 py-2 border rounded-lg cursor-pointer"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    )
}