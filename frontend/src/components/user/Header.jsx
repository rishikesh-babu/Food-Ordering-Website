import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

function Header() {
    return (
        <div className="navbar bg-base-100 shadow-md dark:shadow-lg dark:shadow-blue-200">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-3xl font-bold ">
                    {" "}
                    Food Express{" "}
                </Link>
            </div>
            <div className="dropdown dropdown-end">
                {/* Dropdown trigger button */}
                <label tabIndex={0} className="">
                    <div className="flex-none">
                        <button className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block size-10 stroke-current"
                            >
                                {" "}
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>{" "}
                            </svg>
                        </button>
                    </div>
                </label>

                {/* Dropdown content */}
                <div
                    tabIndex={0}
                    className="dropdown-content mt-3 text-lg p-3 shadow-lg bg-white dark:bg-gray-800 rounded-box min-w-40 space-y-2"
                >
                    <div>
                        <Link
                            to="/login"
                            className="block px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            onClick={(e) => e.currentTarget.blur()}
                        >
                            Login
                        </Link>
                    </div>
                    <div className="w-fit px-3 py-2 rounded-md text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                        <DarkMode />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
