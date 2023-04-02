import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const Login = () => {
    const router = useRouter();
    const handleLogin = async (e) => {
        e.preventDefault();
        // return console.log(process.env.NEXT_PUBLIC_AES_SECRET);
        const form = e.target;
        const userData = {
            email: form.email.value,
            password: form.password.value
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });
        const results = await res.json();
        console.log(results);
        if (results.success) {
            localStorage.setItem("token", results.token)
            form.reset();
            toast.success("Login successful!");
            setTimeout(() => {
                router.push('/')
            }, [2000])
        } else {
            toast.error(results.error);
        }
    }
    return (
        <div className="flex min-h-full items-center justify-center py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8  border border-indigo-500 rounded-md px-8 pb-10 pt-6 m-4">
                <div>
                    <img className="mx-auto h-20 w-auto" src="/login-logp.png" alt="Your Company" />
                    <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-gray-900">Sign in your account</h2>
                    <p className='text-center mt-2 -mb-4'>Or, <Link href={`/signup`}><span className='hover:underline text-blue-500 hover:text-blue-700 '>signup</span></Link></p>
                </div>
                <form onSubmit={handleLogin} className="">
                    <div className="relative mb-2">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter email' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative pb-4 col-span-2">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input id="password" name="password" type='password' placeholder='Enter password' className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className='flex justify-end items-center text-sm'>

                        <Link href={`/forgotPass`}><p className='hover:underline text-blue-500 hover:text-blue-700 '>Forgot your password?</p></Link>
                    </div>
                    <div className='text-center'>
                        <button type='submit' className='font-medium mt-6 text-white bg-red-400 hover:bg-red-500 active:outline active:text-yellow-300 outline-yellow-500 w-full text-center py-2 rounded-md duration-100'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;