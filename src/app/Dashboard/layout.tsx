"use client";

import { ReactNode, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {
  Users,
  Mail,
  Send,
  List,
  MessageSquare,
  BarChart2,
  Sun,
  Moon,
  ChevronDown,
  HomeIcon,
} from "lucide-react";
import Link from "next/link";

// Define the shape of the JWT payload
interface JwtPayload {
  user: {
    email: string;
    id: number;
    firstName: string;
    lastName: string;
  };
  iat: number;
  exp: number;
}

export default function Layout({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch the token from localStorage
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(token);
        const { firstName, lastName } = decodedToken.user;
        setUserName(`${firstName} ${lastName}`); 
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/'; // Adjust the path as needed
  };

  return (
    <div className={`flex h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Sidebar */}
      <div className="w-16 bg-black flex flex-col items-center py-4 space-y-8">
        <div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-xl font-bold">
          M
        </div>
        <nav className="flex flex-col items-center space-y-6">
          <HomeIcon className="w-6 h-6 text-gray-400" />
          <Users className="w-6 h-6 text-gray-400" />
          <Link href={"/Dashboard/Inbox"}>
            <Mail className="w-6 h-6 text-gray-400" />
          </Link>
          <Send className="w-6 h-6 text-gray-400" />
          <List className="w-6 h-6 text-gray-400" />
          <MessageSquare className="w-6 h-6 text-white" />
          <BarChart2 className="w-6 h-6 text-gray-400" />
        </nav>
        <div className="mt-auto mb-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          AS
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className={`h-14 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-200'} flex items-center justify-between px-4`}>
          <h1 className="text-xl font-semibold">Onebox</h1>
          <div className="relative flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2">
              {isDarkMode ? <Sun className="w-5 h-5 text-gray-400" /> : <Moon className="w-5 h-5 text-gray-400" />}
            </button>
            <div className="flex items-center space-x-2">
              <span>{userName}</span>
              <button onClick={handleDropdownToggle} className="p-2">
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <main className="flex-1 flex items-center justify-center">
          {children}
        </main>
      </div>
    </div>
  );
}
