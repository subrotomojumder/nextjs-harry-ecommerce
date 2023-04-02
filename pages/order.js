import React from 'react';
import {TbCurrencyTaka} from 'react-icons/tb';

const Order = () => {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">BRAND NAME</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id : #41g445544l4</h1>
                        <p className="leading-relaxed mb-4">Your order has been successfully placed. Complete product price payment to order.</p>
                        <div className="flex">
                            <a className="flex-grow text-pink-500 border-b border-gray-300 pb-5 text-lg px-1">Item Description</a>
                            <a className="flex-grow text-pink-500 border-b border-gray-300 pb-5 text-lg px-1">Quantity</a>
                            <a className="flex-grow text-pink-500 border-b border-gray-300 pb-5 text-lg px-1">Item Total</a>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 py-2 pr-3">
                            <span className="text-gray-500">Color T-Shirt (XL/Black)</span>
                            <span className="text-gray-900">1</span>
                            <span className="text-gray-900">400</span>
                        </div>
                        <div className="flex justify-between border-b border-gray-200 py-2 pr-3">
                            <span className="text-gray-500">Color T-Shirt (XL/Black)</span>
                            <span className="text-gray-900">1</span>
                            <span className="text-gray-900">400</span>
                        </div>
                        
                        <div className="mt-5">
                            <span className="title-font font-medium text-2xl text-gray-900">SubTotal: 58.00<TbCurrencyTaka className="inline-block mb-1"/></span>
                            <button className="flex text-white bg-pink-500 border-0 py-2 px-6 mt-3 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    );
};

export default Order;