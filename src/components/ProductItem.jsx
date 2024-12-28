import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img
        className="rounded-t-lg w-full object-cover h-48"
        src={product.picture || "https://via.placeholder.com/150"}
        alt={product.name}
      />
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="mb-3 font-semibold text-blue-700 dark:text-blue-300">
          Gh¢{product.price || "N/A"}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
