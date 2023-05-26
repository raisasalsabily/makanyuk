import React from "react";
import aboutImage from "../assets/images/about-image.png"

export const About = () => {
    return (
        <div className="bg-white">
            <div className="p-24 grid grid-cols-2">
                <div className="">
                    <h2 className="text-2xl font-medium">About Us</h2>
                    <p className="text-lg">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores 
                        repellat tempora architecto, labore beatae in accusantium ipsa et 
                        reprehenderit aperiam ex dolores, minus porro nostrum voluptatem quo, 
                        officiis deserunt illum. Assumenda similique repellat harum asperiores 
                        cum, odit amet sint perspiciatis consequuntur reiciendis velit, eos 
                        dolore libero accusantium aliquam enim quasi!
                    </p>
                </div>
                <div className="flex items-center justify-center">
                    <img src={aboutImage} alt="" className="w-[400px] h-[400px] object-cover" />
                </div>
            </div>
        </div>
    )
}