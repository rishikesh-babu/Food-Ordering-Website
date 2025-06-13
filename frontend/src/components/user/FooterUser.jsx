import { GitHub, Instagram, LinkedIn, WhatsApp } from '@mui/icons-material'
import React from 'react'
import { Link } from 'react-router-dom'
import logo from '/logo.jpg'

function Footer() {
    const navigationLink = [
        {
            name: 'About Us',
            link: 'about',
        },
        {
            name: 'Contact',
            link: 'contact',
        },
        {
            name: 'Jobs',
            link: 'jobs',
        },
        {
            name: 'Admin Login',
            link: '/admin/hotel'
        },
    ]

    const socialLink = [
        {
            name: 'Github',
            link: 'https://github.com/rishikesh-babu',
            icon: <GitHub sx={{ fontSize: 30 }} />,
        },
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/rishikesh-babu',
            icon: <LinkedIn sx={{ fontSize: 30 }} />
        },
        {
            name: 'Instagram',
            link: 'https://www.instagram.com/_ri_s_hi_k.e.sh_/',
            icon: <Instagram sx={{ fontSize: 30 }} />
        },
        {
            name: 'Whatsapp',
            icon: <WhatsApp sx={{ fontSize: 30 }} />
        }
    ]

    return (
        <footer className="flex flex-col justify-center items-center gap-10 bg-gray-800 text-neutral-content rounded p-10">
            {/* Navigation Links */}
            <nav className="text-lg flex gap-4 text-nowrap">
                {navigationLink?.map((item, index) => (
                    <Link to={item?.link} key={index} className='link-hover' >
                        {item?.name}
                    </Link>
                ))}
            </nav>

            {/* Social Media Links */}
            <nav>
                <div className="flex gap-9">
                    {socialLink?.map((item, index) => (
                        <a href={item?.link} key={index} target="_blank" rel="noreferrer" className="relative group flex justify-center items-center">
                            <i className='text-3xl sm:text-4xl text-[#00ffff] hover:text-[#3563ff] transition-all duration-300 hover:scale-125'>
                                {item?.icon}
                            </i>
                            <span className="text-lg sm:text-xl capitalize text-[#00ffff] group-hover:text-lime-300 scale-0 group-hover:scale-100 absolute bottom-2 group-hover:bottom-11 sm:group-hover:bottom-14 transition-all duration-[400ms] delay-[50ms]">
                                {item?.name}
                            </span>
                        </a>
                    ))}
                </div>
            </nav>

            {/* Copyright */}
            <aside>
                <div className='flex flex-col-reverse items-center gap-2'>
                    <span className='text-center'>
                        Copyright © {new Date().getFullYear()} - All rights reserved by <br /> Food Express 🍔
                    </span>
                    <img src={logo} alt="" className='size-14 rounded-badge' />
                </div>
            </aside>
        </footer>
    )
}

export default Footer
