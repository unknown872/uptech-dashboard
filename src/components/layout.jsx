"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import logos from "@/assets/logos.png";
import { MdMessage } from "react-icons/md";
import { MdDashboard } from "react-icons/md";


function Layout({ children }) {

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const menuItems = [
        {
            href: "/",
            iconPath: <MdDashboard />,
            label: "Dashboard"
        },
        {
            href: "/message",
            iconPath: <MdMessage />,
            label: "Message"

        }
    ]

    return (
        <div>
            <main>
                <button onClick={toggleDrawer} data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-10 h-10" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <aside ref={sidebarRef} className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isOpen ? 'translate-x-0 w-[400px]' : '-translate-x-full'} sm:translate-x-0`} aria-label="Sidebar">
                    <div className="h-full px-3 py-4 overflow-y-auto bg-white border-r solid dark:bg-gray-800">
                        <a href="" className="flex items-center ps-2.5 mb-5">
                            <Image src={logos} />
                        </a>
                        <ul className="space-y-2 font-medium">
                            {menuItems.map((item, index) => (
                                <li key={index} className='border-b pb-2 mb-2'>
                                    <a href={item.href} className="flex items-center p-2 lg:text-lg text-gray-900 text-2xl rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                        {item.iconPath}
                                        <span className="ms-3">{item.label}</span>
                                        {item.badge && (
                                            <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                                                {item.badge}
                                            </span>
                                        )}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </aside>

                <div className="p-4 sm:ml-64">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
