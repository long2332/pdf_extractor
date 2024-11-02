"use client"
import React from "react";
import Link from "next/link";
import { FileText } from "lucide-react";
import { usePathname } from "next/navigation"; // Import from next/navigation

const Sidebar = () => {
  const pathname = usePathname();

  // Function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-gray-800 text-white flex flex-col p-6">
      <div className="flex items-center gap-2 mb-10">
        <FileText />
        <Link href="/" className="font-semibold text-xl text-green-600">
          PDFExtractor
        </Link>
      </div>
      
      <nav className="flex-grow">
        <ul className="flex flex-col gap-6 font-semibold text-lg">
          <li>
            <Link
              href="/"
              className={`px-3 py-2 rounded ${
                isActive("/") ? "bg-gray-700" : "hover:bg-gray-700 hover:text-green-600"
              }`}
            >
              Extract From Drive
            </Link>
          </li>
          <li>
            <Link
              href="/chat-bot"
              className={`px-3 py-2 rounded ${
                isActive("/chat-bot") ? "bg-gray-700" : "hover:bg-gray-700 hover:text-green-600"
              }`}
            >
              Chatbot
            </Link>
          </li>
          <li>
            <Link
              href="/extract-file"
              className={`px-3 py-2 rounded ${
                isActive("/extract-file") ? "bg-gray-700" : "hover:bg-gray-700 hover:text-green-600"
              }`}
            >
              Upload New Files
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;