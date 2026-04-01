"use client";
import { useState, useRef, useEffect } from "react";
import { User } from "lucide-react";

export default function UserMenu({ email, signOutAction }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className="text-white hover:text-teal-200 transition cursor-pointer"
            >
                <User size={22} />
            </button>

            {open && (
                <div className="absolute mt-1 right-0 w-60 bg-white rounded-xl shadow-lg py-0 z-50">
                    <p className="text-sm text-gray-500 px-4 py-2 truncate">
                        {email}
                    </p>
                    <form action={signOutAction}>
                        <button
                            type="submit"
                            className="w-full rounded-xl text-left text-sm text-red-500 px-4 py-2 hover:bg-red-50 transition cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}