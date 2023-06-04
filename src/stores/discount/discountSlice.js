import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  discount: {},
}

export const discountSlice = createSlice({
  name: "discount",
  initialState,
  reducers: {
    setDiscount: (state, action) => {
      return { discount: action.payload }
    },
    clearDiscount: (state) => {
      return { discount: {} }
    },
  },
})

export const getDiscount = (state) => state.discount

export const { setDiscount, clearDiscount } = discountSlice.actions

export default discountSlice.reducer
