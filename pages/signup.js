import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Signup = () => {
    const [error, setError] = useState('');
    const router = useRouter();
    const handleSignup = async (e) => {
        e.preventDefault();
        const form = e.target;
        const userData = {
            name: form.name.value,
            email: form.email.value,
            password: form.password.value
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const results = await res.json();
        if (results.success) {
            form.reset();
            localStorage.setItem("token", results.token)
            toast.success(results.success);
            setTimeout(() => {
                router.push('/')
            }, [2000])
        } else {
            toast.error(results.error);
        }
    }
    return (
        <div className="flex min-h-full items-center justify-center py-6 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-4  border border-indigo-500 rounded-md px-8 pb-10 pt-3 m-4">
                <div>
                    <img className="mx-auto h-20 w-auto" src="/login-logp.png" alt="Your Company" />
                    <h2 className="mt-4 mb text-center text-3xl font-semibold tracking-tight text-gray-900">Create an account</h2>
                </div>
                <form onSubmit={handleSignup} className="">
                    <div className="relative mb-2">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" placeholder='Enter your name' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-2">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter your email' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative pb-4 col-span-2">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input id="password" name="password" type='password' placeholder='Enter new password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className='flex justify-between items-center text-sm'>
                        <div className=''>
                            <input type="checkbox" name="" id="" /><span className='ml-2'>Agree terms?</span>
                        </div>
                        <Link href={`/login`}><p className='hover:underline text-blue-500 hover:text-blue-700 '>Al ready have an account?</p></Link>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='font-medium mt-6 text-white bg-red-400 hover:bg-red-500 active:outline active:text-yellow-300 outline-yellow-500 w-full text-center py-2 rounded-md duration-100'>Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;  