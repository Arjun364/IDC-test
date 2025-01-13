import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';


const Registration = () => {
    const navigate = useNavigate()
    // Retrieve existing users from localStorage (if any)
    const getUsersFromLocalStorage = () => {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    };
    return (
        <Formik
            initialValues={{ username: "", email: '', password: '' }}
            validate={values => {
                const errors = {};

                if (!values.username) {
                    errors.username = 'username required'
                }

                if (!values.password) {
                    errors.password = 'password is required'
                }
                if (!values.email) {
                    errors.email = 'Email is required';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Invalid email address';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting,setErrors }) => {
                // Retrieve existing users
                const users = getUsersFromLocalStorage();
                // Check if the email already exists
                const existingUser = users.find(user => user.email === values.email);
                if (existingUser) {
                    // If email exists, set the error for email
                    setErrors({ email: 'Email is already registered' });
                    setSubmitting(false);
                    return; // Don't proceed with registration if email is taken
                }
                // Simulate user registration by adding the user data to the array
                users.push({
                    username: values.username,
                    email: values.email,
                    password: values.password,
                });

                // You can use localStorage or alert to check if the data is added successfully
                localStorage.setItem('users', JSON.stringify(users)); // Storing users data in localStorage

                alert("Registration Successful");
                setSubmitting(false);
                navigate('/login')
            }}
        >
            {({ isSubmitting }) => (
                <Form className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white shadow-lg dark:shadow-slate-500  dark:bg-gray-50 dark:text-gray-800'>
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign Up</h1>
                        <p className="text-sm dark:text-gray-600">Sign Up to create your account</p>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div>
                            <label htmlFor="username" className="block mb-1 text-md font-semibold">username</label>
                            <Field type="text" name="username" id="username" placeholder="username" className="mb-1 w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                            <ErrorMessage name="username" className='text-sm text-red-400' component="div" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-1 text-md font-semibold">Email address</label>
                            <Field type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="mb-1 w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                            <ErrorMessage name="email" className='text-sm text-red-400' component="div" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-1">
                                <label htmlFor="password" className="text-md font-semibold">Password</label>
                            </div>
                            <Field type="password" name="password" id="password" placeholder="*****" className="mb-1 w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                            <ErrorMessage name="password" className='text-sm text-red-400' component="div" />
                        </div>
                    </div>
                    <div className='space-y-2 pt-3'>
                        <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md text-white bg-purple-700 dark:text-gray-50" disabled={isSubmitting}>
                            sign up
                        </button>
                        <p className="px-6 text-sm text-center dark:text-gray-600 flex gap-1">Already have a account?
                            <span rel="noopener noreferrer" className=" hover:underline hover:text-purple-700 cursor-pointer " onClick={() => navigate('/login')}>Sign in</span>.
                        </p>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Registration