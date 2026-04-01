"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import Column from "@/components/Column";


export default function Dashboard() {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await fetch("/api/jobs");
            const data = await res.json();
            setJobs(data);
        };

        fetchJobs();
    }, []);

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
        location: "",
        status: "Applied",
    });

    const updateStatus = async (id, newStatus) => {
        const res = await fetch("/api/jobs", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, status: newStatus }),
        });

        const updatedJob = await res.json();

        setJobs((prevJobs) =>
            prevJobs.map((job) =>
                job.id === id ? updatedJob : job
            )
        );
    };

    const handleAddJob = async (e) => {
        e.preventDefault();

        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...newJob,
                dateApplied: new Date().toISOString(),
            }),
        });

        const createdJob = await res.json();

        setJobs((prev) => [...prev, createdJob]);

        setNewJob({ company: "", role: "", location: "", status: "Applied" });
        setIsOpen(false);
    };

    const deleteJob = async (id) => {
        await fetch("/api/jobs", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });
        setJobs((prev) => prev.filter((job) => job.id !== id));
    };


    return (
        <main className="board max-w-7xl mx-auto px-4 py-8">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>

                <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.03 }}
                    className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer transition">
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
                        deleteJob={deleteJob}
                    />
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

                            <input
                                type="text"
                                placeholder="Location (e.g. Remote, Chicago, IL)"
                                value={newJob.location}
                                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                className="border p-2 rounded-lg"
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

                            {selectedJob.location && (
                                <p className="text-gray-600 mb-2">
                                    <strong>Location:</strong> {selectedJob.location}
                                </p>
                            )}

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