import axios from "axios"
import { toast } from "react-toastify"
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

  // ---------------- KUPON -------------------
  const [couponCode, setCouponCode] = useState([])
  const [couponInfo, setCouponInfo] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [err, setErr] = useState("")

  const handleApplyCoupon = async () => {
    setIsLoading(true)
    let code = couponCode
    try {
      const { data } = await axios.get(
        `https://hemat-yuk-backend.vercel.app/vouchers/apply/${code}`,
        {
          headers: {
            Accept: "application/json",
          },
        }
      )

      // console.log("data is: ", JSON.stringify(data, null, 4))
      setCouponInfo(data)
      console.log(data)
      toast.success("Kupon dapat digunakan", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
    } catch (err) {
      setErr(err.message)
      toast.error("Kupon tidak berhasil digunakan")
    } finally {
      setIsLoading(false)
    }
  }

  let discount = couponInfo?.data?.voucher?.value
  let grandTotal = discount ? calculateOrderAmount(cart) - discount : null

  return (
    <div className="flex flex-col">
      {/* seksi kupon */}
      <div className="mt-5">
        <div>
          {/* apply kupon - start */}
          <label>Coupon Code</label>
          <div className="flex">
            <input
              className="mt-3 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Cek kode promo makanan"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value)
              }}
            />
            <div className="p-2">
              <Button onClick={handleApplyCoupon}>Pakai</Button>
            </div>
          </div>
          {/* apply kupon - end */}
        </div>
      </div>
      {/* end - seksi kupon */}

      {/* total price section */}
      <div>
        <p className="font-bold text-h-sm p-2">
          Total: {calculateOrderAmount(cart)}
        </p>
        <p className="font-bold text-h-sm p-2">Diskon: {discount} </p>
        <p className="font-bold text-h-sm p-2">Grand total: {grandTotal}</p>
      </div>
      {/* end - total price section */}
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
