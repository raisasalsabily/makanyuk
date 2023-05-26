import React from "react";

export const ClearCart = ({onClearCart}) => {
  return (
    <div className="flex justify-end">
        <button
        onClick={onClearCart} className="bg-yellow-400 hover:bg-yellow-500 rounded-full w-5 h-5 flex items-center justify-center text-lg"
        >
            <span>Clear Cart</span>
        </button>
    </div>
  )
}