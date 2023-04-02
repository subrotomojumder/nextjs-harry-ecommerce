import { useRouter } from 'next/router';
import React, { useEffect } from 'react';


const MyAccount = () => {
    const router = useRouter();
    useEffect(() => {
      if (!localStorage.getItem('token')) {
        router.push('/');
      }
    }, [router.query])
    
    return (
        <div>
            <h1>My account page</h1>
        </div>
    );
};

export default MyAccount;