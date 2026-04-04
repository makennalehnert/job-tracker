"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import Column from "@/components/Column";

// Reusable focus trap hook
function useFocusTrap(ref, isActive) {
    useEffect(() => {
        if (!isActive || !ref.current) return;

        const focusable = ref.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        first?.focus();

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                ref.current?.closest("[data-modal]")?.dispatchEvent(
                    new CustomEvent("closemodal", { bubbles: true })
                );
            }
            if (e.key !== "Tab") return;
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last?.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first?.focus();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isActive]);
}

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
    );

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
        notes: "",
        status: "Applied",
    });
    const [notesValue, setNotesValue] = useState("");

    const addJobModalRef = useRef(null);
    const detailsModalRef = useRef(null);

    useFocusTrap(addJobModalRef, isOpen);
    useFocusTrap(detailsModalRef, !!selectedJob);

    useEffect(() => {
        setNotesValue(selectedJob?.notes ?? "");
    }, [selectedJob?.id]);

    // Close modals on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                if (selectedJob) setSelectedJob(null);
                if (isOpen) setIsOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [selectedJob, isOpen]);

    const updateStatus = async (id, newStatus) => {
        const res = await fetch("/api/jobs", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, status: newStatus }),
        });
        const updatedJob = await res.json();
        setJobs((prev) => prev.map((job) => job.id === id ? updatedJob : job));
    };

    const updateNotes = async (id, notes) => {
        const res = await fetch("/api/jobs", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, notes }),
        });
        const updatedJob = await res.json();
        setJobs((prev) => prev.map((job) => job.id === id ? updatedJob : job));
    };

    const handleAddJob = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/jobs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...newJob,
                dateApplied: new Date().toISOString(),
            }),
        });
        const createdJob = await res.json();
        setJobs((prev) => [...prev, createdJob]);
        setNewJob({ company: "", role: "", location: "", notes: "", status: "Applied" });
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
                <h1 className="text-3xl font-bold">Job Dashboard</h1>
                <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.03 }}
                    aria-haspopup="dialog"
                    className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer transition focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
                >
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

            {/* Add Job Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center"
                    onClick={() => setIsOpen(false)}
                    aria-hidden="true"
                >
                    <div
                        ref={addJobModalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="add-job-title"
                        data-modal
                        className="bg-teal-50 p-6 rounded-xl w-full max-w-md"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 id="add-job-title" className="text-xl font-semibold mb-4">
                            Add Job
                        </h2>

                        <form onSubmit={handleAddJob} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="company" className="text-sm font-medium text-gray-700">
                                    Company <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="company"
                                    type="text"
                                    placeholder="e.g. Google"
                                    value={newJob.company}
                                    onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
                                    className="border p-2 rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="role" className="text-sm font-medium text-gray-700">
                                    Role <span aria-hidden="true">*</span>
                                </label>
                                <input
                                    id="role"
                                    type="text"
                                    placeholder="e.g. Frontend Developer"
                                    value={newJob.role}
                                    onChange={(e) => setNewJob({ ...newJob, role: e.target.value })}
                                    className="border p-2 rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="location" className="text-sm font-medium text-gray-700">
                                    Location
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    placeholder="e.g. Remote, Chicago, IL"
                                    value={newJob.location}
                                    onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                                    className="border p-2 rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                    Notes
                                </label>
                                <textarea
                                    id="notes"
                                    placeholder="Any notes about this application..."
                                    value={newJob.notes}
                                    onChange={(e) => setNewJob({ ...newJob, notes: e.target.value })}
                                    className="border p-2 rounded-lg bg-white resize-none h-24 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                />
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="status" className="text-sm font-medium text-gray-700">
                                    Status
                                </label>
                                <select
                                    id="status"
                                    value={newJob.status}
                                    onChange={(e) => setNewJob({ ...newJob, status: e.target.value })}
                                    className="border p-2 rounded-lg bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                >
                                    <option>Applied</option>
                                    <option>Interview</option>
                                    <option>Offer</option>
                                    <option>Rejected</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2">
                                <motion.button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.03 }}
                                    className="px-4 py-2 border rounded-lg bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.03 }}
                                    className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                >
                                    Add
                                </motion.button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Job Details Modal */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 bg-black/50 flex items-center justify-center"
                        onClick={() => setSelectedJob(null)}
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            key="modal"
                            ref={detailsModalRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="job-details-title"
                            data-modal
                            className="bg-teal-50 p-6 rounded-xl w-full max-w-md"
                            onClick={(e) => e.stopPropagation()}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <h2 id="job-details-title" className="text-xl font-semibold mb-4">
                                {selectedJob.role}
                            </h2>

                            <dl className="mb-4 flex flex-col gap-2">
                                <div className="flex gap-1">
                                    <dt className="text-gray-600 font-semibold">Company:</dt>
                                    <dd className="text-gray-600">{selectedJob.company}</dd>
                                </div>

                                {selectedJob.location && (
                                    <div className="flex gap-1">
                                        <dt className="text-gray-600 font-semibold">Location:</dt>
                                        <dd className="text-gray-600">{selectedJob.location}</dd>
                                    </div>
                                )}

                                <div className="flex gap-1">
                                    <dt className="text-gray-600 font-semibold">Status:</dt>
                                    <dd className="text-gray-600">{selectedJob.status}</dd>
                                </div>

                                <div className="flex gap-1">
                                    <dt className="text-gray-600 font-semibold">Date Applied:</dt>
                                    <dd className="text-gray-600">
                                        {new Date(selectedJob.dateApplied).toLocaleDateString()}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mb-4">
                                <label
                                    htmlFor="job-notes"
                                    className="text-gray-600 font-semibold block mb-1"
                                >
                                    Notes
                                </label>
                                <textarea
                                    id="job-notes"
                                    value={notesValue}
                                    onChange={(e) => setNotesValue(e.target.value)}
                                    onBlur={(e) => {
                                        if (selectedJob) updateNotes(selectedJob.id, e.target.value);
                                    }}
                                    placeholder="Add notes..."
                                    className="w-full border rounded-lg bg-white p-2 text-sm text-gray-600 resize-none h-28 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                />
                                <p className="text-xs text-gray-400 mt-1" aria-live="polite">
                                    Notes save automatically when you click away
                                </p>
                            </div>

                            <div className="flex justify-end">
                                <motion.button
                                    onClick={() => setSelectedJob(null)}
                                    whileHover={{ scale: 1.03 }}
                                    className="px-4 py-2 border rounded-lg bg-white cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}