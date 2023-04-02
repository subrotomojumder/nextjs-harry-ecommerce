import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowRight } from 'react-icons/ai';

const ErrorPage = () => {
    const router = useRouter();
    // console.log(router);
    return (
        <div className='h-[50vh] flex justify-center items-center'>
            <div className='text-center'>
                <h1 className='text-4xl'>404</h1>
                <p className='text-yellow-300 text-lg'>Something went wrong!</p>
                <h1 className='text-red-400 text-xl'>error</h1>
                <Link href={`/`}>
                    <button className='m-2 px-2 py-1 bg-slate-300 text-white font-semibold rounded-sm'>Home<AiOutlineArrowRight className='inline' /></button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;