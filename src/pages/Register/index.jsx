import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../components/elements/Button";
import { app } from "../../firebase-config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    
    let navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        setLoading(true);
        const authentication = getAuth();
        let uid = '';
        createUserWithEmailAndPassword(authentication, data.email, data.password)
        .then((response) => {
            uid = response.user.id;
            sessionStorage.setItem('User Id', uid);
            sessionStorage.setItem('Auth token', response._tokenResponse.refreshToken)
            window.dispatchEvent(new Event("storage"))
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                toast.error('Email Already In Use')
            }
        })

        fetch('http://localhost:8081/api/create-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                name: data.name,
                _id: uid
            })
        }).then((response) => {
            if (response.status === 200) {
                setLoading(false);
                toast.success('Account created successfully!🎉', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'dark'
                        });
                navigate('/');
            } else {
                console.log(response.json());
            }
        }).catch((error) => {
            setLoading(false);
            console.log(error);
        })
    }
    
    return (
        <div className="h-screen bg-white flex  items-center justify-center">
            <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 transition duration-300"></div>
                <div className="p-10 rounded-xl z-10 w-full h-full bg-white">
                    <img src="../assets/images/logo.png" alt="" className=""/>
                    <h5 className="text-3xl flex items-center justify-center">Sign up</h5>
            <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label
                    htmlFor="name"
                    className="block text-lg font-small text-gray-200">Full Name</label>
                    <input
                    {...register('name')}
                    id="name"
                    type="text"
                    className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <div>
                    <label
                    htmlFor="email"
                    className="block text-lg font-small text-gray-200">Email Address</label>
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
                    className="block text-lg font-small text-gray-200">Password</label>
                    <input
                    {...register('password')}
                    id="password"
                    type="password"
                    className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <div>
                <label
                    htmlFor="password"
                    className="block text-lg font-small text-gray-200">Confirm Password</label>
                    <input
                    {...register('password')}
                    id="password"
                    type="password"
                    className="appearance-none bg-transparent border-b w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    />
                </div>
                <Button size="large">{loading ? "Signing up" : "Sign up"}</Button>
                <Button variant = 'secondary' size="large">{loading ? "Signing in" : "Sign in"}</Button>
            </form>
            </div>
        </div>
    </div>
    )
}

export default Register;