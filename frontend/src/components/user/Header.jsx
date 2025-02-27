import React, { useState } from "react";
import { Link } from "react-router-dom";
import DarkMode from "../shared/DarkMode";

function Header() {
    return (
        <div className="navbar bg-base-100 shadow-md dark:shadow-lg dark:shadow-blue-200">
            <div className="flex-1">
                <Link to={'/'} className="btn btn-ghost text-3xl font-bold "> Food Express </Link>
            </div>
            <div className="flex-none">
                <DarkMode />
                <ul className="menu menu-horizontal px-1 text-2xl font-semibold">
                    <li>
                        <Link to={"/login"}> Login </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Header;
