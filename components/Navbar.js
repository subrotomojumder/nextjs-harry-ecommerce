import Image from 'next/image';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from 'react-icons/ai';
import { BsBagCheckFill } from 'react-icons/bs';
import { RiAccountCircleFill } from 'react-icons/ri';

const Navbar = ({ cartAllElements: { user, logout, cart, clearCart, addToCart, removeFromCart, subTotal } }) => {
    const [dropdown, setDropdown] = useState(false);
    const cartRef = useRef();
    const toggleCart = () => {
        if (cartRef.current.classList.contains('translate-x-full')) {
            cartRef.current.classList.remove('translate-x-full');
            cartRef.current.classList.add('translate-x-0');
        } else if (cartRef.current.classList.contains('translate-x-0')) {
            cartRef.current.classList.remove('translate-x-0');
            cartRef.current.classList.add('translate-x-full');
        }
    };

    return (
        <div className='w-full flex justify-between item-center px-1 lg:px-8 py-1 bg-indigo-100 shadow-md fixed top-0 left-0 z-20'>
            <div className="flex flex-col md:flex-row justify-start items-center flex-auto">
                <div className="logo">
                    <Link href={`/`}>
                        <Image width={120} height={40} src='/logo.png' alt='log png' ></Image>
                    </Link>
                </div>
                <ul className='flex justify-end items-center space-x-0 md:space-x-1 font-semibold'>
                    <Link href={`/tshirts`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>T-Shirts</li></Link>
                    <Link href={`/hoodies`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Hoodies</li></Link>
                    <Link href={`/stickers`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Stickers</li></Link>
                    <Link href={`/mug`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>Mugs</li></Link>
                    <Link href={`/about`}><li className=' hover:bg-indigo-200 py-[6px] px-1 md:px-3 rounded-sm whitespace-pre'>About</li></Link>
                </ul>
            </div>
            <div className='cart flex justify-end item-center gap-2 mt-2 mx-2 mr-4 md:mr-5 font-semibold absolute to-10 right-2 md:right-8'>
                {!user.value && <Link href={`/login`}>
                    <button className='text-md text-green-500 hover:text-white border border-green-400 hover:border-white hover:bg-green-400 px-2 py-[2px] rounded-md duration-75'>login</button>
                </Link>}
                <div onClick={() => setDropdown(!dropdown)} onMouseLeave={() => setDropdown(false)}>
                    {user.value && <button className='text-3xl text-blue-500'><RiAccountCircleFill /></button>}
                    {dropdown && <div className="absolute right-8 bg-pink-300 top-8 rounded-md px-3 py-3 w-28 text-center">
                        <ul>
                            <Link href={`/myaccount`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Account</li></Link>
                            <Link href={`/orders/${user.value?.email}`}><li className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Orders</li></Link>
                            <li onClick={logout} className="py-1 w-full hover:shadow-md hover:text-white cursor-pointer text-sm duration-75">Logout</li>
                        </ul>
                    </div>}
                </div>
                <button onClick={toggleCart} className='text-2xl text-green-500'><MdOutlineShoppingCart /></button>
                <p className='text-green-500 border border-white rounded-full w-6 h-6 text-md font-bold absolute -top-2 -right-5 flex justify-center items-center'>{Object.keys(cart).length}</p>
            </div>
            <div className='relative'>
                <div ref={cartRef} className='w-80 overflow-y-scroll h-[100vh] absolute top-0 -right-4 lg:-right-12 bg-indigo-200 rounded-sm shadow-md z-50 py-4 px-4 transform transition-transform translate-x-full duration-200'>
                    <p onClick={toggleCart} className='text-3xl text-red-400 cursor-pointer w-8 ml-auto -mt-2'><AiFillCloseCircle /></p>
                    <h4 className='mb-2 text-xl font-medium text-center'>Shopping Cart</h4>
                    <hr />
                    <ol className='text-lg list-decimal font-medium ml-4 mt-2'>
                        {!Object.keys(cart).length && <p className='text-base text-red-500 text-center my-20'>Your cart is empty!</p>}
                        {Object.keys(cart).map((pdCode) =>
                            <li key={pdCode}>
                                <div className='grid grid-cols-6 justify-between items-center gap-1 mt-2'>
                                    <p className='col-span-4'>{cart[pdCode].name} <span className='text-sm'>({cart[pdCode].variant}/{cart[pdCode].size})</span></p>
                                    <div className='col-span-2 flex justify-between items-center pl-2'>
                                        <AiOutlineMinusCircle onClick={() => removeFromCart(pdCode, 1)} className='cursor-pointer text-green-600' />
                                        <p>{cart[pdCode].qty}</p>
                                        <AiOutlinePlusCircle onClick={() => addToCart(pdCode, 1, cart[pdCode].price, cart[pdCode].name, cart[pdCode].size, cart[pdCode].variant)} className='cursor-pointer text-green-600' />
                                    </div>
                                </div>
                            </li>
                        )}
                    </ol>
                    {Object.keys(cart).length > 0 &&
                        <div className='flex justify-center gap-5 mt-6 px-6'>
                            <button onClick={() => { clearCart(); toggleCart() }} className='font-medium text-white bg-red-400 hover:bg-red-500 active:outline active:text-yellow-300 outline-yellow-500 py-[6px] w-full text-center rounded-md duration-100'>Clear</button>
                            <Link href={`/checkout`}  onClick={toggleCart} className='font-medium text-white bg-orange-300 hover:bg-orange-400 active:outline active:text-yellow-300 outline-yellow-500 py-[6px] w-full text-center rounded-md duration-100'> <button>Checkout</button></Link>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Navbar;