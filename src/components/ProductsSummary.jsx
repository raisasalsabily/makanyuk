import React from "react"
import { useSelector } from "react-redux"
import { cartProducts } from "../stores/cart/cartSlice"
import { ProductsSummaryCard } from "./ProductsSummaryCard"

export const ProductsSummary = () => {
  const cart = useSelector(cartProducts)
  var total = 0
  return (
    <div className="flex flex-col">
      {cart &&
        cart?.map((product, index) => {
          total += product.price * product.amount
          return <ProductsSummaryCard product={product} key={index} />
        })}
      <div className="flex flex-row mt-5">
        <h3 className="basis-3/4 text-b-xl font-bold">Total</h3>
        <div className="total basis-1/4 font-bold text-b-xl flex pl-2">{`Rp ${total}`}</div>
      </div>
    </div>
  )
}
