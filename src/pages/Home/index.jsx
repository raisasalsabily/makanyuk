import React from "react"
import { Banner } from "../../components/Banner"
import { About } from "../../components/About"
import { ProductsPreview } from "../../components/ProductsPreview"

const Home = () => {
  return (
    <div className="w-[98%] lg:w-9/12 mx-auto flex flex-col justify-center items-center">
      <Banner />
      <ProductsPreview />
      <About />
    </div>
  )
}

export default Home
