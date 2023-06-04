import React, { useEffect, useState } from "react"
import axios from "axios"

// const historyData = [
//   {
//     id: 1,
//     name: "Malioboro",
//     location: "Yogyakarta, DIY",
//     imageURL:
//       "https://images.unsplash.com/photo-1543874768-af0b9c4090d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
//   },
// ]

// const historyData = [
//   {
//     shippingAddress: {
//       custName: "Raisa Adriana",
//       custPhone: "081187238",
//       address: "jalan kebenrana9999",
//       city: "solo",
//       postalCode: "1293",
//       country: "indones",
//     },
//     _id: "647c345de4bf223048bd53fc",
//     orderItems: [
//       {
//         name: "Aglio Olio",
//         amount: 1,
//         price: 50000,
//         product: "pasta",
//         _id: "647c345de4bf223048bd53fd",
//       },
//       {
//         name: "Bolognese",
//         amount: 1,
//         price: 58000,
//         product: "pasta",
//         _id: "647c345de4bf223048bd53fe",
//       },
//       {
//         name: "Carbonara",
//         amount: 1,
//         price: 66000,
//         product: "pasta",
//         _id: "647c345de4bf223048bd53ff",
//       },
//     ],
//     paymentMethod: "COD",
//     taxPrice: 0,
//     shippingPrice: 0,
//     totalPrice: 174000,
//     isPaid: false,
//     isDelivered: false,
//     createdAt: "2023-06-04T06:51:09.927Z",
//     updatedAt: "2023-06-04T06:51:09.927Z",
//     __v: 0,
//   },
// ]

const History = () => {
  const [orders, setOrders] = useState([])
  const [error, setError] = useState(false)
  const [isOrdersLoading, setIsOrdersLoading] = useState(false)

  const getOrders = async () => {
    setIsOrdersLoading(true)
    try {
      const res = await axios.get("http://localhost:8081/api/orders", {
        headers: {
          Accept: "application/json",
        },
      })
      setOrders(res.data)
      console.log(res.data)
    } catch (error) {
      setError(error)
      // console.log(error)
    }
    setIsOrdersLoading(false)
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <div>
      <div id="container" className="flex flex-col">
        {/* title */}
        <div className="text-h-md font-semibold bg-amber-300 flex justify-center items-center my-8 py-4">
          Histori Pemesanan
        </div>
        {/* main */}
        <main className="mx-4 lg:mx-16">
          {/* order item */}
          {orders?.data ? (
            orders?.data?.map((item) => (
              <div>
                {/* order item start */}
                <div
                  id="order__item"
                  className="my-4 border-2 border-neutral-500 rounded-md w-[98%] max-w-[800px]"
                >
                  <table class="table-fixed">
                    <tbody>
                      <tr>
                        <td className="px-4 py-2">Nama penerima</td>
                        <td className="px-4 py-2">
                          {item.shippingAddress.custName}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Alamat</td>
                        <td className="px-4 py-2">
                          {item.shippingAddress.address},{" "}
                          {item.shippingAddress.city},{" "}
                          {item.shippingAddress.postalCode}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Item</td>
                        <td className="px-4 py-2">
                          {" "}
                          {item.orderItems.map((orderItem) => (
                            <div>
                              <p>
                                {orderItem.name} x {orderItem.amount} :{" "}
                                {orderItem.price}
                              </p>
                            </div>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Total harga</td>
                        <td className="px-4 py-2">{item.totalPrice}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* end - order item */}
              </div>
            ))
          ) : (
            <div>belum ada pemesanan</div>
          )}
        </main>
      </div>
    </div>
  )
}
export default History
