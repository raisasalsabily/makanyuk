import cartIcon from "../assets/icons/cart.svg";
// import logo from "../assets/images/logo.png";
import foody from "../assets/images/foody.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "./elements/Button";
import React, { useState, useEffect } from "react";

export const Header = ({ cartCount }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogout = () => {
        sessionStorage.removeItem('Auth token');
        sessionStorage.removeItem('User Id');
        window.dispatchEvent(new Event("storage"))
        navigate("/");
    }

    let [open,setOpen]=useState(false);

    useEffect(() => {
        const checkAuthToken = () => {
            const token = sessionStorage.getItem('Auth token');
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }

        window.addEventListener('storage', checkAuthToken);
        return () => {
            window.removeEventListener('storage', checkAuthToken)
        }
    }, [])

    return (
        <nav id="header" className="bg-white text-black sticky top-0 z-50">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                    <img src={foody} alt="logo" className="w-[187px] h-[44px] object-cover"/>
                    </Link>
                </div>
                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    <Link to="/" className="text-b-xl font-bold font-poppins">Home</Link>
                    <Link to="/about" className="text-b-xl font-bold font-poppins">About</Link>
                </div>
                <div className="flex items-center-justify-center space-x-4">
                    <Link to="/cart" className="mr-4 relative">
                        <img src={cartIcon} alt="cart" />
                        {cartCount > 0 ? <div className="rounded-full bg-yellow text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
                    </Link>
                    {
                        isLoggedIn ?
                        <Button onClick={handleLogout}>Log Out</Button> :
                        (
                            <>
                            <Link to="/login" className="text-b-xl font-bold font-poppins">Login</Link>
                            <Link to="/register" className="text-b-xl font-bold font-poppins">Sign Up</Link>
                            </>
                        )
                    }
                    
                </div>
            </div>
        </nav>
    )
}