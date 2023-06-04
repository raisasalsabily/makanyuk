import { combineReducers } from "@reduxjs/toolkit"
import cartReducer from "./cart/cartSlice"
import productReducer from "./menu/productsSlice"
import addressReducer from "./userInfo/addressSlice"
// import discountReducer from "./discount/discountSlice"

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productReducer,
  address: addressReducer,
  //   discount: discountReducer,
})

export default rootReducer
