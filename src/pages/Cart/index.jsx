import React from "react"
import { Tabs } from "../../components/Tabs"
import Button from "../../components/elements/Button"
import { useSelector, useDispatch } from "react-redux"
import { cartProducts, clearCart } from "../../stores/cart/cartSlice"
import useTabSwitch from "../../hooks/useTabSwitch"
import { ReactComponent as ArrowRightSvg } from "../../assets/icons/arrow-right-long-svgrepo-com.svg"
import { AddressForm } from "../../components/AddressForm"
import { ProductsSummary } from "../../components/ProductsSummary"
import { StripeWrapper } from "../../components/PaymentForm"

const Cart = () => {
  const cart = useSelector(cartProducts)
  const tabs = ["Summary", "Delivery", "Payment"]
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, "Summary")
  const dispatch = useDispatch()
  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white h-full text-black flex justify-center p-4">
        <h1 className="">Keranjang Anda masih kosong</h1>
      </div>
    )
  }
  return (
    <div className="bg-white h-min text-black mx-auto mt-8 border border-gray-200 p-4 md:w-2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
      <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== "Summary" ? "hidden" : ""}`}>
        <ProductsSummary />

        <div className="mt-5">
          <label>Coupon Code</label>
          <div className="flex">
            <input
              className="mt-3 w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" 
              type="text" 
              placeholder="Cek kode promo makanan" 
            />
            <div className="p-2">
              <Button>
                Pakai
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end p-2">
          <Button
            className="relative right-5"
            onClick={() => dispatch(clearCart())}
          >
            Hapus semua item
          </Button>
          <Button
            variant="dark"
            className="flex items-center"
            onClick={() => handleTabSwitch("Delivery")}
          >
            <span className="mr-1">Lanjut</span>
            <ArrowRightSvg />
          </Button>
        </div>
      </div>
      <div className={`tabs ${currentTab !== "Delivery" ? "hidden" : ""}`}>
        <AddressForm onTabSwitch={handleTabSwitch} />
      </div>
      <div className={`tabs ${currentTab !== "Payment" ? "hidden" : ""}`}>
        <StripeWrapper />
      </div>
    </div>
  )
}

export default Cart
