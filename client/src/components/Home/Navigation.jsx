import React, { useState } from 'react'
import { FaCat } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from '../../routes/AuthContext';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { logout } = useAuth()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const loggingout = () => {
        // clear the 
        alert(`loging the user out`)
        logout()
    }

    // Handle account deletion
    const deleteAccount = () => {
        // Retrieve users from localStorage or from the current state
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const storedCurrentUser = JSON.parse(sessionStorage.getItem('user'));

        // Filter out the current user from the users list
        const updatedUsers = storedUsers.filter(user => user.email !== storedCurrentUser.email);

        // Remove the current user from localStorage
        localStorage.setItem('users', JSON.stringify(updatedUsers));

        // Optionally, you could redirect the user or show a success message
        alert("Your account has been deleted successfully.");

        // After deleting, you can log out the user
        loggingout();
    };


    return (
        <header className="w-full p-4 dark:bg-gray-100 dark:text-gray-800">
            <div className="container flex items-center justify-between h-16 mx-auto">
                <span
                    rel="noopener noreferrer"
                    aria-label="Back to homepage"
                    className="flex items-center p-2"
                >
                    <FaCat className='text-[2rem]' />
                </span>
                <h2 className='text-lg font-bold'>Home</h2>
                <div className="items-center flex-shrink-0 hidden lg:flex gap-3">
                    <button className="self-center px-6 py-2 font-semibold rounded border-2 border-solid border-black hover:border-gray-700 hover:text-gray-700 " onClick={() => loggingout()}>Logout</button>
                    <button className="self-center px-6 py-2 font-semibold rounded border-2 border-solid border-red-500 hover:bg-red-500 text-red-500 hover:text-white  dark:bg-default-600 dark:text-gray-50" onClick={()=>deleteAccount()}> Delete account</button>
                </div>
                {/* Hamburger Menu Button */}
                <button
                    onClick={toggleMenu}
                    className="p-4 lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6 dark:text-gray-800"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
            </div>
            {/* Dropdown Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 dark:text-gray-200 shadow-lg z-50"
                >
                    <nav className="flex flex-col space-y-2 p-4">
                        <button className=" px-6 py-2 font-semibold rounded border-2 border-solid border-black hover:border-gray-700 hover:text-gray-700 " onClick={() => loggingout()}>
                            logout
                        </button>
                        <button className="px-6 py-2 font-semibold rounded border-2 border-solid border-red-500 hover:bg-red-500 text-red-500 hover:text-white  dark:bg-default-600 dark:text-gray-50" onClick={()=>deleteAccount()}>
                            Delete Account
                        </button>
                    </nav>
                </motion.div>
            )}
        </header>
    )
}

export default Navigation