import React, { useState } from "react";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="navbar bg-base-100 shadow-md">
            <div className="flex-1">
                <a href="/" className="btn btn-ghost text-3xl font-bold "> Food Express </a>
            </div>
            <div className="flex-none">
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
