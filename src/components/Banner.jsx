import React from "react"
import Button from "./elements/Button"
import { Link } from "react-router-dom"

export const Banner = () => {
  return (
    <div className="w-full mx-auto relative flex items-center">
      <div className="banner-image w-full p-3 h-full items-center absolute">
        <img
          src={require("../assets/images/banner_pasta.png")}
          alt="banner"
          className=" h-full w-full object-cover mix-blend-overlay"
        />
      </div>

      <div className="banner-description w-full md:w-1/2 p-3">
        <h2 className="text-h-md font-bold text-white pt-6 px-8">
          Special Discount
        </h2>
        <p className="font-bold text-h-xl text-white py-2 px-8">20%</p>
        <div className="btn-container pb-8 px-8">
          <Button className=" h-8 bg-yellow text-white relative rounded-lg border-transparent flex items-center text-b-sm">
            claim here
          </Button>

          {/* <div className="text-yellow-400 hover:text-yellow-500 font-bold text-decoration-line px-3">
                        <Link to="/menu" className="text-xl">See menu</Link>
                    </div> */}
        </div>
      </div>
    </div>
  )
}
