"use client";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-teal-700">
            <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold text-white">
                    JobTracker
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    <Link
                        href="/dashboard"
                        className="text-white hover:text-teal-200 transition"
                    >
                        Dashboard
                    </Link>

                    <Link
                        href="/login"
                        className="text-white hover:text-teal-200 transition"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="bg-teal-950 text-white px-4 py-2 rounded-lg hover:bg-teal-900 hover:text-teal-200 transition"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

        </nav>
    );
}