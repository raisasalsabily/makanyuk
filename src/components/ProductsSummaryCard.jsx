import React from "react"
import { useDispatch } from "react-redux"
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../stores/cart/cartSlice"
import PastaTemp from "../../src/assets/images/Spaghetti Aglio e Olio.jpg"

export const ProductsSummaryCard = ({ product }) => {
  const dispatch = useDispatch()
  // var subtotal = 0;
  var subtotal =+ product.price * product.amount;
  return (
    <div className="flex p-1 sm:p-2 border-b border-b-gray-200">
      <div className="product-image mr-2 border border-grey-200 rounded-lg">
        <img src={PastaTemp} alt={"pastatemp"} className="w-24" />
      </div>
      {/* start - card main  */}
      <div
        id="card__main"
        className="px-4 w-full flex gap-3 justify-center items-center"
      >
        {/* nama dan harga produk */}
        <div className="product-info basis-2/3">
          <h3 className="font-semibold">{product.name}</h3>
          <div className="price">{`Rp ${product.price}`}</div>
          {/* <p className="text-gray-600">{product.description}</p> */}
        </div>
        {/* end- nama dan harga produk */}
        {/* kuantitas produk */}
        <div className="product-qt basis-1/3 flex flex-col items-center justify-center">
          <div className="quantity flex gap-1 justify-center items-center">
            <button
              className="font-bold p-1 h-5 w-5 rounded-full bg-yellow text-white flex justify-center items-center"
              disabled={product.amount <= 0}
              onClick={() => dispatch(decrementProductAmount(product))}
            >
              -
            </button>
            <span className="p-1">{product.amount}</span>
            <button
              className="font-bold p-1 h-5 w-5 rounded-full bg-yellow text-white flex justify-center items-center"
              onClick={() => dispatch(incrementProductAmount(product))}
            >
              +
            </button>
          </div>
        </div>
        {/* kuantitas produk */}
        {/*Sub total*/}
        <div className="basis-1/3 flex flex-col">
          <h3 className="text-b-sm">sub total</h3>
          <div className="price font-semibold flex">{`Rp ${subtotal}`}</div>
        </div>
      </div>
      {/* end - card main  */}

    </div>
  )
}
