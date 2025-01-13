import React, { useState, useEffect } from 'react';

const UpdateDetails = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email: '',
        password: '',  // Add password to the state
    });

    const [error, setError] = useState('');  

    // Fetch the current user's details when the component mounts
    useEffect(() => {
        const currentUser = JSON.parse(sessionStorage.getItem('user'));
        if (currentUser) {
            setUserDetails({
                username: currentUser.username,
                email: currentUser.email,
                password: currentUser.password, // Assuming password is stored in sessionStorage
            });
        }
    }, []);

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle form submission to update user details
    const handleSubmit = (e) => {
        e.preventDefault();

        // Password validation
        if (userDetails.password === '') {
            setError('Password cannot be empty.');
            return;
        }

        // Update the user details directly
        const updatedUser = {
            username: userDetails.username,
            email: userDetails.email,
            password: userDetails.password,  // Update the password
        };

        // Update user details in localStorage
        let storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        storedUsers = storedUsers.map((user) =>
            user.email === updatedUser.email ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(storedUsers));

        // Update user in sessionStorage
        sessionStorage.setItem('user', JSON.stringify(updatedUser));

        setError(''); // Clear error if everything is correct
        alert("User details updated successfully!");
    };

    return (
        <div className="flex-1 h-[20rem] md:h-full rounded-md border border-solid shadow-lg">
            <div className="w-full h-[3rem] bg-blue-500 flex items-center justify-center">
                <h4 className="text-[1rem] font-semibold text-white">Update Details</h4>
            </div>

            {/* Update user details form */}
            <div className="w-full h-full flex flex-col gap-4 mt-4 px-4">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-semibold">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userDetails.username}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded-md"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userDetails.email}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded-md"
                            required
                        />
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col gap-2 mt-4">
                        <label htmlFor="password" className="font-semibold">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userDetails.password}
                            onChange={handleChange}
                            className="border px-4 py-2 rounded-md"
                        />
                    </div>

                    {/* Display error message if the password is empty */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}

                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-2 font-semibold rounded border-2 border-solid border-blue-500 hover:bg-blue-500 hover:text-white"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDetails;
