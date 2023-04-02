import React, { useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

const Checkout = ({ cartAllElements: { cart, addToCart, removeFromCart, subTotal } }) => {
    const [deliveryBio, setDeliveryBio] = useState({});
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {
        if (deliveryBio.name && deliveryBio.email && deliveryBio.address && deliveryBio.phone && deliveryBio.city && deliveryBio.state && deliveryBio.pinCode.length > 3) {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [deliveryBio])
    console.log(deliveryBio);
    return (
        <div className='max-w-6xl m-auto'>
            <h1 className="text-green-500 font-semibold text-3xl my-8 text-center">Checkout page</h1>
            <h2 className='px-4 text-lg font-semibold'>1. Delivery Details</h2>
            <div className='px-4 grid grid-cols-2 gap-x-4'>
                <div className="relative mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4 col-span-2">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} id="address" name="address" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-20 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                </div>
                <div className="relative mb-4">
                    <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="pinCode" className="leading-7 text-sm text-gray-600">Pin-code</label>
                    <input onChange={(e) => setDeliveryBio({ ...deliveryBio, [e.target.name]: e.target.value })} type="text" id="email" name="pinCode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
            </div>
            <h2 className='px-4 text-lg font-semibold'>2. Review Cart Items & Pay</h2>
            {subTotal > 0 && <div className='bg-indigo-200 pt-4 pb-6 px-4 md:px-6 rounded-sm mx-4'>
                <ol className='text-lg list-decimal font-medium ml-4 mt-2'>
                    {Object.keys(cart).map((pdCode) =>
                        <li key={pdCode}>
                            <div className='grid grid-cols-3 md:grid-cols-6 justify-between items-center gap-3 mt-2'>
                                <p className='text-base text-left'>{cart[pdCode].name} ({cart[pdCode].size}/<span className='capitalize'>{cart[pdCode].variant}</span>)</p>
                                <div className='flex justify-center items-center gap-3'>
                                    <AiOutlineMinusCircle onClick={() => removeFromCart(pdCode, 1)} className='cursor-pointer text-green-600' />
                                    <p>{cart[pdCode].qty}</p>
                                    <AiOutlinePlusCircle onClick={() => addToCart(pdCode, 1, cart[pdCode].price, cart[pdCode].name, cart[pdCode].size, cart[pdCode].variant)} className='cursor-pointer text-green-600' />
                                </div>
                                <p className='text-base'>{cart[pdCode].qty * cart[pdCode].price} Tk</p>
                            </div>
                        </li>
                    )}
                    <div className='flex justify-between items-center mt-5'>
                        <h2 className='font-bold -ml-4 mt-3'>SubTotal: {subTotal} ৳</h2>
                        <button disabled={disabled} className='font-medium disabled:bg-green-400 disabled:cursor-not-allowed disabled:outline-none disabled:text-white bg-green-500 hover:bg-green-600 active:outline text-white outline-blue-500 outline-2 w-24 text-center py-2 rounded-md drop-shadow-xl duration-100'>Pay</button>
                    </div>
                </ol>
            </div>}
        </div >
    );
};

export default Checkout;    