"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import "./globals.css";
import Link from "next/link";
import { FC, ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">
        <QueryClientProvider client={queryClient}>
          <nav className="bg-white shadow-md p-4 sticky top-0 z-10">
            <div className="max-w-4xl mx-auto flex gap-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Home
              </Link>
              <Link
                href="/create"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Create Idea
              </Link>
            </div>
          </nav>
          <main className="pt-4">{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
};

export default RootLayout;
