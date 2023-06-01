import axios from "axios"
import { clearCart, cartProducts } from "../stores/cart/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { getAddress, clearAddress } from "../stores/userInfo/addressSlice"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Button from "./elements/Button"

export const StripeWrapper = () => {
  return <PaymentForm />
}
const PaymentForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const cart = useSelector(cartProducts)
  const address = useSelector(getAddress)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios
        .post("http://localhost:8081/create-payment-intent", {
          orderItems: cart,
          shippingAddress: {
            custName: address.custName,
            custPhone: address.custPhone,
            address: address.address,
            city: address.city,
            postalCode: address.postcode,
            country: address.country,
          },
        })
        .then(function (response) {
          dispatch(clearAddress())
          dispatch(clearCart())
          navigate("/order-success")
          console.log(response)
          console.log(address)
        })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <form
      className="md:-2/3 md:mx-auto px-2 pt-1"
      id="payment-form"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-center p-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Pembayaran COD"}
        </Button>
      </div>
    </form>
  )
}
