import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../../routes/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate() // deaclare the navigation 
    const { login } = useAuth()
    const handleSignIn = (userData) => {
        alert(`user created : ${userData.username}`)
        login(userData);
    };


    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'email required'
                }

                if (!values.password) {
                    errors.password = 'password required'
                }

                return errors;
            }}
            onSubmit={(values, { setSubmitting,setErrors }) => {
                const { email, password } = values;

                // Retrieve the users from localStorage
                const users = JSON.parse(localStorage.getItem('users')) || [];

                // Check if the user exists
                const user = users.find(user => user.email === email);

                if (user) {
                    // Check if the password matches
                    if (user.password === password) {
                        handleSignIn(user); // Login the user
                        navigate('/home'); // Redirect to the home page
                    } else {
                        setErrors({ password: 'Incorrect password' }); // Show password error
                    }
                } else {
                    setErrors({ email: 'User not found' }); // Show username error
                }

                setSubmitting(false); // Stop form submission
            }}
        >
            {({ isSubmitting }) => (
                <Form className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-white shadow-lg dark:shadow-slate-500  dark:bg-gray-50 dark:text-gray-800'>
                    <div className="mb-8 text-center">
                        <h1 className="my-3 text-4xl font-bold">Sign in</h1>
                        <p className="text-sm dark:text-gray-600">Sign in to access your account</p>
                    </div>
                    <div className="space-y-2 mb-4">
                        <div>
                            <label htmlFor="useemailrname" className="block mb-1 text-md font-semibold">email</label>
                            <Field type="text" name="email" id="email" placeholder="email" className="mb-1 w-full px-3 py-2 border rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
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
                            sign in
                        </button>
                        <p className="px-6 text-sm text-center dark:text-gray-600 flex gap-1">Doesn't have an account? 
                            <span rel="noopener noreferrer" className=" hover:underline hover:text-purple-700 cursor-pointer " onClick={() => navigate('/registration')}>Sign up</span>.
                        </p>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export default Login