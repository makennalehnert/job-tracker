"use client";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const JobCard = ({ job, setSelectedJob, updateStatus, deleteJob }) => {
    return (
        <motion.div
            layout
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 mb-3 rounded-xl shadow-sm border flex flex-col gap-2"
        >
            {/* Row 1: Role + Delete */}
            <div className="flex justify-between items-center">
                <button
                    onClick={() => setSelectedJob(job)}
                    className="font-semibold text-lg text-left pr-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded cursor-pointer"
                    aria-label={`View details for ${job.role} at ${job.company}`}
                >
                    {job.role}
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteJob(job.id);
                    }}
                    aria-label={`Delete ${job.role} at ${job.company}`}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg border transition focus:outline-none cursor-pointer focus-visible:ring-2 focus-visible:ring-red-400"
                >
                    <Trash2 size={17} aria-hidden="true" />
                </button>
            </div>

            {/* Row 2: Company + Location on left, Status dropdown on right */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col pr-1.5">
                    <p className="text-gray-500 text-sm">{job.company}</p>
                    {job.location && (
                        <p className="text-gray-400 text-xs">{job.location}</p>
                    )}
                </div>

                <div>
                    <label
                        htmlFor={`status-${job.id}`}
                        className="sr-only"
                    >
                        Status for {job.role} at {job.company}
                    </label>
                    <select
                        id={`status-${job.id}`}
                        value={job.status}
                        onChange={(e) => updateStatus(job.id, e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        className={`border rounded-lg px-2.5 py-1 text-sm cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-black ${
                            job.status === "Applied"
                                ? "bg-blue-100 text-blue-700"
                                : job.status === "Interview"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : job.status === "Offer"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                        }`}
                    >
                        <option value="Applied">Applied</option>
                        <option value="Interview">Interview</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>
        </motion.div>
    );
};

export default JobCard;