import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { app } from "../../firebase-config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        const authentication = getAuth();
        let uid = '';
        signInWithEmailAndPassword(authentication, data.email, data.password)
        .then((response) => {
            uid = response.user.id;
            sessionStorage.setItem('User Id', uid);
            sessionStorage.setItem('Auth token', response._tokenResponse.refreshToken)
            window.dispatchEvent(new Event("storage"))
            setLoading(false);
            toast.success('Successful Login!🎉', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                        });
                navigate('/');
        })
        .catch((error) => {
            if (error.code === 'auth/wrong-password') {
                toast.error('Wrong Password')
            }
            if (error.code === 'auth/user-not-found') {
                toast.error('Email not found, please register')
            }
            setLoading(false);
        })

    }    
    return (
        <div className="h-screen bg-white flex  items-center justify-center">
            <img src="../assets/images/logo.png" alt="" className=""/>
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 transition duration-300 "></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-white">
                    <h5 className="text-3xl flex items-center justify-center">Sign in</h5>
            <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-200 ">Email Address</label>
                    <input
                    {...register('email')}
                    id="email"
                    type="email"
                    className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <div>
                    <label
                    htmlFor="password"
                    className="block text-lg font-medium text-gray-200">Password</label>
                    <input
                    {...register('password')}
                    id="password"
                    type="password"
                    className=" appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <Button size="large">{loading ? "Signing in" : "Sign in"}</Button>
                <Button variant = 'secondary' size="large">{loading ? "Signing up" : "Sign up"}</Button>
            </form>
           
            </div>
        </div>
    </div>
    )
}

export default Login;