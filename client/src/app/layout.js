
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "JobTracker",
  description: "Track your job applications in one place",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-teal-50">

        {/* Skip to main content - first focusable element on every page */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-teal-700 focus:px-4 focus:py-2 focus:rounded-lg focus:font-medium focus:shadow"
        >
          Skip to main content
        </a>

        <Navbar />

        <div id="main-content" className="flex flex-col flex-1">
          {children}
        </div>

      </body>
    </html>
  );
}
