import Link from "next/link";
import { auth, signOut } from "@/auth";
import UserMenu from "@/components/UserMenu";

export default async function Navbar() {
    const session = await auth();

    const signOutAction = async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
    };

    return (
        <nav className="border-b bg-teal-700 h-16">
            <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold text-white hover:text-teal-100">
                    JobTracker
                </Link>

                <div className="flex items-center gap-6">
                    {session ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-white hover:text-teal-100 transition"
                            >
                                Dashboard
                            </Link>

                            <UserMenu
                                email={session.user.email}
                                signOutAction={signOutAction}
                            />
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="text-white hover:text-teal-100 transition"
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