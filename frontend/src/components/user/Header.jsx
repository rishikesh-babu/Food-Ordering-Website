import React from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";
import logo from '/logo.jpg';
import { Menu, Home, LogIn, UserPlus } from "lucide-react";

function Header() {
    return (
        <div className="navbar bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800/80 px-4 sm:px-8 transition-all duration-300">
            <div className="flex-1">    
                <Link
                    to={"/"}
                    className="flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                    <div className="w-10 h-10 rounded-xl overflow-hidden shadow-md ring-2 ring-amber-500/20">
                        <img src={logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xl sm:text-2xl font-black bg-gradient-to-r from-amber-500 to-rose-500 bg-clip-text text-transparent tracking-tight font-outfit">
                        Food Express
                    </span>
                </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
                <Link
                    to="/"
                    className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 font-semibold transition-colors duration-200"
                >
                    Home
                </Link>
                <div className="flex items-center gap-4">
                    <DarkMode />
                    <Link
                        to="/login"
                        className="text-gray-700 dark:text-gray-200 hover:text-amber-500 dark:hover:text-amber-400 font-semibold px-3 py-2 transition-colors duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        to="/signup"
                        className="bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 text-white font-bold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-amber-500/20 active:scale-95 text-sm"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <div className="md:hidden dropdown dropdown-end">
                <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <Menu className="size-6 text-gray-700 dark:text-gray-300" />
                </label>
                <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-white dark:bg-gray-800 rounded-2xl z-50 mt-3 min-w-56 p-3 shadow-2xl border border-gray-100 dark:border-gray-700/50 gap-2"
                >
                    <li>
                        <Link
                            to="/"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                            onClick={(e) => e.currentTarget.blur()}
                        >
                            <Home className="size-4 text-gray-500 dark:text-gray-400" />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/login"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 font-semibold"
                            onClick={(e) => e.currentTarget.blur()}
                        >
                            <LogIn className="size-4 text-gray-500 dark:text-gray-400" />
                            <span>Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/signup"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-600 hover:to-rose-600 font-semibold"
                            onClick={(e) => e.currentTarget.blur()}
                        >
                            <UserPlus className="size-4" />
                            <span>Sign Up</span>
                        </Link>
                    </li>
                    <li className="border-t border-gray-100 dark:border-gray-700 mt-2 pt-2 flex flex-row items-center justify-between px-3 py-1.5 hover:bg-transparent dark:hover:bg-transparent">
                        <span className="text-xs text-gray-600 dark:text-gray-400 font-semibold">Theme</span>
                        <DarkMode />
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
