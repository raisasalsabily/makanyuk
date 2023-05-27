import React from "react"
import { useDispatch } from "react-redux"
import {
  incrementProductAmount,
  decrementProductAmount,
} from "../stores/cart/cartSlice"
import PastaTemp from "../../src/assets/images/pastatemp.png"

export const ProductsSummaryCard = ({ product }) => {
  const dispatch = useDispatch()

  return (
    <div className="flex p-1 sm:p-2 border-b border-b-gray-200">
      <div className="product-image mr-2 border border-grey-200 rounded-lg">
        <img src={PastaTemp} alt={"pastatemp"} className="w-24 h-24" />
      </div>
      {/* start - card main  */}
      <div id="card__main" className="flex flex-col gap-3">
        {/* nama dan deskripsi produk */}
        <div className="product-info">
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
        {/* end- nama dan deskripsi produk */}
        {/* harga dan kuantitas produk */}
        <div className="product-price-qt flex flex-col items-center justify-center">
          <div className="price">{`Rp ${product.price}`}</div>
          <div className="quantity flex justify-center items-center">
            <button
              className="font-bold p-1 h-5 w-5 rounded-md bg-yellow-500 text-white flex justify-center items-center"
              disabled={product.amount <= 0}
              onClick={() => dispatch(decrementProductAmount(product))}
            >
              -
            </button>
            <span className="p-1">{product.amount}</span>
            <button
              className="font-bold p-1 h-5 w-5 rounded-md bg-yellow-500 text-white flex justify-center items-center"
              onClick={() => dispatch(incrementProductAmount(product))}
            >
              +
            </button>
          </div>
        </div>
        {/* end - harga dan kuantitas produk */}
      </div>
      {/* end - card main  */}
    </div>
  )
}
