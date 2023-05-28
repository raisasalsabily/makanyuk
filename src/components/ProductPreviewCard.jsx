import React from "react";
import { AddProduct } from "./AddProduct";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div className="w-full p-4 m-2 rounded text-black bg-white text-center border drop-shadow-lg">
      <img src={product.imgUrl} alt={product.name} />
      <h2 className="pb-2 text-b-md font-bold font-poppins">{product.name}</h2>
      <p className="mb-2 h-20 line-clamp-4">{product.description}</p>
      <AddProduct onAddProduct={addProduct} />
    </div>
  );
};
