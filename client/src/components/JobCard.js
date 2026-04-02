"use client";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const JobCard = ({ job, setSelectedJob, updateStatus, deleteJob }) => {

    return (
        <motion.div
            onClick={() => setSelectedJob(job)}
            layout
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 mb-3 rounded-xl shadow-sm border flex flex-col gap-2 cursor-pointer"
        >
            {/* Row 1: Role + Delete */}
            <div className="flex justify-between items-center">
                <h2 className="font-semibold text-lg">{job.role}</h2>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteJob(job.id);
                    }}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded-lg border transition"
                >
                    <Trash2 size={17} />
                </button>
            </div>

            {/* Row 2: Company + Status dropdown */}
            <div
                className="flex justify-between items-center"
            >
                <div className="flex flex-col">
                    <p className="text-gray-500 text-sm">{job.company}</p>
                    {job.location && (
                        <p className="text-gray-400 text-xs">{job.location}</p>
                    )}
                </div>
                <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className={`border rounded-lg px-2.5 py-1 text-sm cursor-pointer ${job.status === "Applied"
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
        </motion.div>
    );
};

export default JobCard;