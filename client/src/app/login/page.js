"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      router.push("/dashboard");
      router.refresh();
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-60px)]">
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6">Log in</h1>

        <form
          onSubmit={handleSubmit}
          aria-label="Login form"
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              autoComplete="email"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              autoComplete="current-password"
              required
            />
          </div>

          {error && (
            <p
              role="alert"
              aria-live="assertive"
              className="text-red-500 text-sm"
            >
              {error}
            </p>
          )}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            className="bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span>Logging in...</span>
              </>
            ) : (
              "Log in"
            )}
          </motion.button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a
            href="/register"
            className="underline focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded">
            Register
          </a>
        </p>
      </div>
    </main>
  );
}