import Link from 'next/link';
import React from 'react';
import mongoose from 'mongoose';
import Product from '../models/Product';


const stickers = ({ products }) => {
    console.log(products);
    return (
        <div>
            <div className="text-2xl text-center mt-4">Stickers page</div>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-10 mx-auto">
                    <div className="flex justify-center flex-wrap -m-4">
                        {/* product key neyar karon products ekta object  */}
                        {Object.keys(products).length === 0 && <div className="w-1/2 h-[30vh] py-[10%] text-lg text-center">
                            Sorry all the Stickers are currently out of stock. New stock coming soon. Stay Tuned!
                        </div>}
                        {Object.keys(products).map(product => <div key={products[product]._id} className="lg:w-1/4 md:w-1/2 p-2 w-full">
                            <Link href={`/products/${products[product].slug}`}>
                                <div className='shadow-sm hover:shadow-md rounded-md p-3 border border-gray-100'>
                                    <div className="block relative max-h-72 rounded overflow-hidden">
                                        <img alt="ecommerce" className="object-top w-full h-full block" src={products[product].img} loading='lazy' />
                                    </div>
                                    <div className="mt-4 text-center md:text-left">
                                        <h3 className="text-gray-500 text-sm tracking-widest title-font mb-1">{products[product?.category]}</h3>
                                        <h2 className="text-gray-900 title-font text-lg font-medium">{products[product].title}</h2>
                                        <p className="mt-1">Price - ${products[product].price}</p>
                                        <div className="mt-1 flex justify-start gap-1">
                                            <p className='capitalize'>size: </p>
                                            {products[product]?.size.map((sz, i) => <p key={i}>{i !== 0 && ", "}<span className='border border-gray-200 px-1'>{sz}</span></p>)}
                                        </div>
                                        <div className="mt-1 flex justify-start gap-1">
                                            {products[product].color.includes("red") && <button className='w-6 h-6 bg-red-500 rounded-full border border-gray-300 p-[2px]'></button>}
                                            {products[product].color.includes("white") && <button className='w-6 h-6 bg-white rounded-full border border-gray-300 p-[2px]'></button>}
                                            {products[product].color.includes("black") && <button className='w-6 h-6 bg-black rounded-full border border-gray-300 p-[2px]'></button>}
                                            {products[product].color.includes("blue") && <button className='w-6 h-6 bg-blue-500 rounded-full border border-gray-300 p-[2px]'></button>}
                                            {products[product].color.includes("purple") && <button className='w-6 h-6 bg-purple-500 rounded-full border border-gray-300 p-[2px]'></button>}
                                            {products[product].color.includes("yellow") && <button className='w-6 h-6 bg-yellow-500 rounded-full border border-gray-300 p-[2px]'></button>}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>)}
                    </div>
                </div>
            </section>
        </div>
    );
};

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URI);
    };
    let products = await Product.find({category: "Sticker"});
    let stickers = {};
    for (let item of products) {
        if (item.title in stickers) {
            if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
                stickers[item.title].color.push(item.color);
            };
            if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
                stickers[item.title].size.push(item.size);
            };
        } else {
            stickers[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {
                stickers[item.title].color = [item.color];
                stickers[item.title].size = [item.size];
            }
        };
    };
    return {
        props: { products: JSON.parse(JSON.stringify(stickers)) },
    }
}

export default stickers;