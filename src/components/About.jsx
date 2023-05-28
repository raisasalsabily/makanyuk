import React from "react";
import aboutImage from "../assets/images/about-image.png"

export const About = () => {
    return (
        <div className="w-full bg-white flex flex-col justify-center">
            <div className="w-screen p-24 flex flex-row justify-center items-center ">
                <div className="flex items-center justify-center w-full">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>

                <div className="w-full">
                    <h2 className="text-b-xl font-medium">About Us</h2>
                    <p className="text-b-md text-justify">
                    Makan Yuk adalah sebuah restoran pasta yang menyajikan berbagai jenis hidangan pasta dengan variasi rasa dan cita rasa yang unik. Restoran ini dikenal dengan konsep yang menarik, menyajikan pasta dengan berbagai saus, topping, dan bahan segar yang berkualitas.

                    Dalam menu Makan Yuk, Anda akan menemukan beragam pilihan pasta seperti spaghetti, fettuccine, penne, dan linguine. Setiap hidangan pasta dapat disesuaikan dengan preferensi pelanggan, baik dalam hal saus, seperti carbonara, marinara, pesto, atau aglio e olio, maupun dalam hal tambahan topping seperti daging panggang, udang, jamur, atau sayuran segar.
                    </p>
                </div>
            </div>
        </div>
    )
}