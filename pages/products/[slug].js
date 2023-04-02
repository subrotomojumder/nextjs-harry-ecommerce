import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Product from '../../models/Product';
import mongoose from 'mongoose';
import { AiFillStar } from 'react-icons/ai';
import { ImStarHalf } from 'react-icons/im';
import { toast } from 'react-toastify';

const Slug = ({ cartAllElements: { addToCart, clearCart, buyNow }, product, variants }) => {
  const [pin, setPin] = useState('');
  const [service, setService] = useState(null);
  const [selectedColor, setSelectedColor] = useState(product.color);
  const [selectedSize, setSelectedSize] = useState(product.size);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(product);
  // console.log(variants);
  const refreshVariant = (newColor, newSize) => {
    // return console.log(newColor, newSize);
    const url = `${process.env.NEXT_PUBLIC_HOST}/products/${variants[newColor][newSize].slug}`;
    window.location = url
  }
  const checkServiceAbility = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    const pincodes = await res.json();
    if (pincodes.includes(parseInt(pin))) {
      setService(true);
      toast.success('Your pin code is serviceable!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      setService(false);
      toast.error('Sorry! pin code not serviceable', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 lg:py-20 mx-auto">
          <div className="lg:w-4/5 mx-auto flex items-center flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 px-10 w-full lg:h-auto h-72 object-cover object-center rounded" src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">{product.category}</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/<span className='capitalize'>{product.color}</span>)</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <span className="flex items-center text-xl">
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <AiFillStar />
                    <ImStarHalf />
                  </span>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("red") && Object.keys(variants.red).includes(selectedSize) && < button onClick={() => refreshVariant("red", selectedSize)} className={`border-2 ${selectedColor === "red" ? "border-black" : "border-gray-300"} ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("white") && Object.keys(variants.white).includes(selectedSize) && <button onClick={() => refreshVariant("white", selectedSize)} className={`border-2 ${selectedColor === "white" ? "border-black" : "border-gray-300"} ml-1 bg-white rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("black") && Object.keys(variants.black).includes(selectedSize) && <button onClick={() => refreshVariant("black", selectedSize)} className={`border-2 ${selectedColor === "black" ? "border-black" : "border-gray-300"} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("blue") && Object.keys(variants.blue).includes(selectedSize) && <button onClick={() => refreshVariant("blue", selectedSize)} className={`border-2 ${selectedColor === "blue" ? "border-black" : "border-gray-300"} ml-1 bg-blue-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("purple") && Object.keys(variants.purple).includes(selectedSize) && <button onClick={() => refreshVariant("purple", selectedSize)} className={`border-2 ${selectedColor === "purple" ? "border-black" : "border-gray-300"} ml-1 bg-purple-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                  {Object.keys(variants).includes("yellow") && Object.keys(variants.yellow).includes(selectedSize) && <button onClick={() => refreshVariant("yellow", selectedSize)} className={`border-2 ${selectedColor === "yellow" ? "border-black" : "border-gray-300"} ml-1 bg-yellow-500 rounded-full w-6 h-6 focus:outline-none`}></button>}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={selectedSize} onChange={(e) => refreshVariant(selectedColor, e.target.value)} className="rounded border appearance-none border-gray-300 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                      {Object.keys(variants[selectedColor]).includes("S") && <option value={`S`}>S</option>}
                      {Object.keys(variants[selectedColor]).includes("M") && <option value={`M`}>M</option>}
                      {Object.keys(variants[selectedColor]).includes("L") && <option value={`L`}>L</option>}
                      {Object.keys(variants[selectedColor]).includes("XL") && <option value={`XL`}>XL</option>}
                      {Object.keys(variants[selectedColor]).includes("XXL") && <option value={`XXL`}>XXL</option>}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">${product.price}</span>
                  <button onClick={() => buyNow(slug, 1, product.price, product.title, product.size, product.color)} className="flex ml-4 md:ml-8 whitespace-pre text-sm md:text-md text-white bg-indigo-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-indigo-600 rounded">Buy Now</button>
                  <button onClick={() => addToCart(slug, 1, product.price, product.title, product.size, product.color)} className="flex ml-4 whitespace-pre text-sm md:text-md text-white bg-indigo-500 border-0 py-2 px-4 md:px-6 focus:outline-none hover:bg-indigo-600 active:bg-indigo-700 rounded">Add to Cart</button>
                  <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  </button>
                </div>
                <div className="pin mt-6 flex space-x-2 text-sm">
                  <input onChange={(e) => setPin(e.target.value)} type="text" placeholder='Enter your pincode' className='py-1 px-2 border-2 border-pink-500 focus:outline-blue-400 rounded-md' />
                  <button onClick={checkServiceAbility} className="text-white bg-pink-500 border-0 py-2 px-3 focus:outline-none hover:bg-pink-600 rounded">Check</button>
                </div>
                {service !== null && !service &&
                  < p className='text-red-700 text-sm mt-2'>Sorry! We do not deliver to this pincode.</p>
                }
                {service !== null && service &&
                  <p className='text-green-500 text-sm mt-2 ml-6'>Yay! This pincode is serviceable.</p>
                }
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  };
  let product = await Product.findOne({ slug: context.query.slug });
  let variants = await Product.find({ title: product.title, category: product.category });
  // console.log(128,variants);
  let colorSizeSlug = {};
  for (const item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug))
    }
  }
}

export default Slug;






