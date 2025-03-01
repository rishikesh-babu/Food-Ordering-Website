import { GitHub, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'

function AdminFooter() {
    return (
        <footer className="footer footer-center bg-neutral text-neutral-content rounded p-10">
            {/* Navigation Links */}
            <nav className="grid grid-flow-col gap-4">
                <Link className="link link-hover">
                    About Us
                </Link>
                <Link className="link link-hover">
                    Contact
                </Link>
                <Link className="link link-hover">
                    Jobs
                </Link>
                <Link to="/" className="link link-hover">
                    Home page
                </Link>
            </nav>

            {/* Social Media Links */}
            <nav>
                <div className="grid grid-flow-col gap-6">
                    <a href="https://github.com/rishikesh-babu" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-105">
                        <GitHub sx={{ fontSize: 30}} />
                    </a>
                    <a href="https://www.linkedin.com/in/rishikesh-babu" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-105">
                        <LinkedIn sx={{ fontSize: 30}} />
                    </a>
                    <a href="https://www.instagram.com/_ri_s_hi_k.e.sh_/" target="_blank" rel="noreferrer" className="hover:text-primary hover:scale-105">
                        <Instagram sx={{ fontSize: 30}} />
                    </a>
                    <a  target="_blank" rel="noreferrer" className="hover:text-primary transition duration-300">
                        <WhatsApp sx={{ fontSize: 30}} />
                    </a>
                </div>
            </nav>

            {/* Copyright */}
            <aside>
                <p>Copyright © {new Date().getFullYear()} - All rights reserved by Food Express 🍔</p>
            </aside>
        </footer>
    )
}

export default AdminFooter
