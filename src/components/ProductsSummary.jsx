import React from "react";
import { useSelector } from "react-redux";
import { cartProducts } from "../stores/cart/cartSlice";
import { ProductsSummaryCard } from "./ProductsSummaryCard";

export const ProductsSummary = () => {
    const cart = useSelector(cartProducts);
    var total = 0;
    return (
        <div className="flex flex-col">
            { cart && cart?.map((product, index) => {
                total += product.price * product.amount;
                return (
                    <ProductsSummaryCard product={product} key={index} />
                )
            })}
            <div className="flex flex-row">
                <h3 className="basis-2/3 text-b-xl font-bold">Total</h3>
                <div className="total basis-1/3 font-bold text-b-xl flex">{`Rp ${total}`}</div>
            </div>
        </div>
    )
}
