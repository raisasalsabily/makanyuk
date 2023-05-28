import React from "react";

export const AddProduct = ({ onAddProduct }) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={onAddProduct} className="bg-yellow hover:bg-white rounded-full w-5 h-5 flex items-center justify-center text-lg text-white hover:text-black">
        <span>+</span>
      </button>
    </div>
  );
};
