import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import '@/styles/globals.css';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import LoadingBar from 'react-top-loading-bar';
import 'react-toastify/dist/ReactToastify.css';


export default function App({ Component, pageProps }) {
  const [cart, setCart] = useState({});
  const [subTotal, setSubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setCart(JSON.parse(localStorage.getItem("cart")))
        saveCart(JSON.parse(localStorage.getItem("cart")))
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem("cart");
    };
    router.events.on('routeChangeStart', () => {
      setProgress(40);
    });
    router.events.on('routeChangeComplete', () => {
      setProgress(100);
    });
  }, [router.query])
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/get_user?token=${localStorage.getItem("token")}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setUser({value: data.user})
        }
      })
  }, []);
  const saveCart = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
    let subT = 0;
    const cartsKeys = Object.keys(cartData);
    for (let i = 0; i < cartsKeys.length; i++) {
      subT = subT + cartData[cartsKeys[i]].price * cartData[cartsKeys[i]].qty;
    }
    setSubTotal(subT)
  }
  const addToCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty + qty;
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant };
    };
    setCart(newCart);
    saveCart(newCart);
  };
  const removeFromCart = (itemCode, qty) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = cart[itemCode].qty - qty;
    }
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const clearCart = () => {
    setCart({});
    saveCart({});
  };
  const buyNow = (itemCode, qty, price, name, size, variant) => {
    //  return console.log(itemCode, qty, price, name, size, variant);
    let newCart = { [itemCode]: { qty: qty, price, name, size, variant } };
    setCart(newCart);
    saveCart(newCart);
    router.push(`/checkout`);
  }
  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    router.push('/');
  }
  const cartAllElements = {
    user, logout, cart, addToCart, removeFromCart, clearCart, buyNow, subTotal
  }

  return <div className='max-w-[1500px] mx-auto pt-12 overflow-hidden'>
    <LoadingBar
      color='#746CFF'
      progress={progress}
      waitingTime={400}
      onLoaderFinished={() => setProgress(0)}
    />
    <Navbar cartAllElements={cartAllElements}></Navbar>
    <Component cartAllElements={cartAllElements} {...pageProps} />
    <Footer></Footer>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
    <ToastContainer />
  </div>
}
