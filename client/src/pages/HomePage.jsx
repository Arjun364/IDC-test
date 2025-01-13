import React, { useEffect, useState } from 'react';
import DarkModeSwitcher from '../components/DarkModeSwitcher';

import Navigation from '../components/Home/Navigation';
import ExploreUser from '../components/Home/ExploreUser';
import Friendlist from '../components/Home/Friendlist';
import UpdateDetails from '../components/Home/UpdateDetails';

const HomePage = () => {
    useEffect(() => {
        const updateLastSeen = () => {
          const currentUser = JSON.parse(sessionStorage.getItem("user"));
          if (currentUser) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const updatedUsers = users.map((user) =>
              user.email === currentUser.email
                ? { ...user, lastSeen: new Date().toISOString() }
                : user
            );
            localStorage.setItem("users", JSON.stringify(updatedUsers));
          }
        };
    
        // Update on logout or tab close
        window.addEventListener("beforeunload", updateLastSeen);
    
        return () => {
          window.removeEventListener("beforeunload", updateLastSeen);
        };
      }, []);
    return (
        <div className="w-full h-[100vh] dark:bg-black dark:text-white flex flex-col items-center">
            {/* Header Section */}
            <Navigation/>
            <div className='w-full h-[100vh] flex  flex-wrap  justify-between px-4 py-2 gap-2 overflow-y-scroll overflow-x-hidden '>
             <ExploreUser/>
             <Friendlist/>
             <UpdateDetails/>
            </div>
            
        </div>
    );
};

export default HomePage;
