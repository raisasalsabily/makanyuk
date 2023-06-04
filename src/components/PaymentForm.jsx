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
  const calculateOrderAmount = (orderItems) => {
    const initialValue = 0
    const itemsPrice = orderItems.reduce(
      (previousValue, currentValue) =>
        previousValue + currentValue.price * currentValue.amount,
      initialValue
    )
    return itemsPrice
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      // payment cod
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
          paymentMethod: "COD",
        })
        .then(function (response) {
          dispatch(clearAddress())
          dispatch(clearCart())
          navigate("/order-success")
          console.log(response)
          console.log(address)
        })

      // kirim log penggunaan kupon
      await axios
        .post("https://hemat-yuk-backend.vercel.app/transactions", {
          companyName: "makanYuk",
          userPhone: "081326591992",
          voucherCode: "MAKANYUK70",
          // transactionValue: 100000,
          transactionValue: calculateOrderAmount(cart),
        })
        .then(function (response) {
          console.log(response)
        })
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const handleBayaryuk = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await axios.post(
        "http://localhost:8081/create-payment-intent",
        {
          orderItems: cart,
          shippingAddress: {
            custName: address.custName,
            custPhone: address.custPhone,
            address: address.address,
            city: address.city,
            postalCode: address.postcode,
            country: address.country,
          },
          paymentMethod: "bayarYuk",
        }
      )
      const bayarYukresponse = await axios.post(
        "http://192.168.110.186:8000/api/payment/store",
        {
          nominal: calculateOrderAmount(cart),
          id: response.data._id,
        },
        {
          headers: {
            Authorization: "Bearer UCyxpsTuXuwkS1JJMpPc1Jz2Z3k4ijx2",
          },
        }
      )
      console.log(calculateOrderAmount)
      dispatch(clearAddress())
      dispatch(clearCart())
      navigate("/order-success")
      console.log(response)
      console.log(address)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col">
      <h3 className="font-bold text-h-sm p-2">Grand Total = {`Rp`} </h3>
      <div>
        <h4 className="text-b-md p-2 flex justify-center">
          Pilih metode pembayaran
        </h4>
      </div>
      <form
        className="md:-2/3 md:mx-auto px-2 pt-1"
        id="cod-form"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center p-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Cash On Delivery"}
          </Button>
        </div>
      </form>
      <form
        className="md:-2/3 md:mx-auto px-2 pt-1"
        id="bayaryuk-form"
        onSubmit={handleBayaryuk}
      >
        <div className="flex justify-center p-2">
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "BayarYuk"}
          </Button>
        </div>
      </form>
    </div>
  )
}
