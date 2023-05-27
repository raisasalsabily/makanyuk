import React from "react"

export const ClearCart = ({ onClearCart }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onClearCart}
        className="bg-yellow hover:bg-yellow-500 rounded-sm w-5 h-5 flex items-center justify-center text-lg"
      >
        <span>Hapus semua item</span>
      </button>
    </div>
  )
}
