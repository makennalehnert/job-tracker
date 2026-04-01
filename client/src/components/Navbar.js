import Link from "next/link";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
    const session = await auth();

    return (
        <nav className="border-b bg-teal-700">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

                {/* Logo / Brand */}
                <Link href="/" className="text-xl font-bold text-white">
                    JobTracker
                </Link>

                {/* Nav Links */}
                <div className="flex items-center gap-6">
                    {session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-white hover:text-teal-200 transition"
                            >
                                Dashboard
                            </Link>

                            <span className="text-white text-sm">
                                {session.user.email}
                            </span>

                            <form
                                action={async () => {
                                    "use server";
                                    await signOut({ redirectTo: "/login" });
                                }}
                            >
                                <button
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition cursor-pointer"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white hover:text-teal-200 transition"
                            >
                                Login
                            </Link>

                            <Link
                                href="/register"
                                className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}