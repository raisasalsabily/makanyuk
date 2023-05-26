import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Header } from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Menu from "../pages/Menu";
import Cart from "../pages/Cart";
import { About } from "../components/About";
import PaymentSuccess from "../pages/PaymentSuccess";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { Footer } from "../components/Footer"

const Navigation = () => {
    const productsInCart = useSelector(cartProducts);
    
    return (
        <BrowserRouter>
        <ToastContainer />
        <Header cartCount={productsInCart ? productsInCart.length : 0}/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
        </BrowserRouter>
    )
}

export default Navigation;