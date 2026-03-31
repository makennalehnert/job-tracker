"use client";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";

const JobCard = ({ job, setSelectedJob, updateStatus }) => {



    return (
        <motion.div
            onClick={() => setSelectedJob(job)}
            layout
            whileHover={{ scale: 1.02 }}
            className="bg-white p-4 mb-3 rounded-xl shadow-sm border flex justify-between items-center cursor-pointer"
        >
            {/* Left side */}
            <div>
                <h2 className="font-semibold text-lg">{job.role}</h2>
                <p className="text-gray-500">{job.company}</p>
            </div>


            <div
                className="flex flex-col items-end"
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // need to add delete function here
                    }}
                    className="text-red-500 hover:bg-red-50 mb-2.5 p-1.5 rounded-xl border transition"
                >
                    <Trash2 size={17} />
                </button>
                {/* Status dropdown */}
                <div
                    className="relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <select
                        value={job.status}
                        onChange={(e) => updateStatus(job.id, e.target.value)}
                        className={`border rounded-lg px-3 py-1 pr-8 ml-5 text-sm appearance-none cursor-pointer ${job.status === "Applied"
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

                    <span className="text-black text-xs absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        ▼
                    </span>
                </div>
            </div>
        </motion.div>
        
    );
};

export default JobCard;