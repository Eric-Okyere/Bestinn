import React, { useState } from 'react';

const Categories = ({ categories, onCategoryClick }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  if (!categories || categories.length === 0) {
    return <div className="text-red-500">No categories available</div>;
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    onCategoryClick(categoryId);
  };

  return (
    <div className="px-4 pt-4 md:pt-10 md:mx-40">
      {/* <h1 className="text-2xl font-bold mb-4">Categories</h1> */}
      <div className="flex overflow-x-auto space-x-4 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`text-center w-28 rounded-lg p-2 hover:bg-gray-400 ${selectedCategoryId === null ? 'bg-black text-white' : 'bg-gray-300'}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category._id}
            onClick={() => handleCategoryClick(category._id)}
            className={`flex-shrink-0 text-center w-28 rounded-lg p-2 hover:bg-gray-400 ${selectedCategoryId === category._id ? 'bg-black text-white' : 'bg-gray-300'}`}
          >
            {/* <img
              src={category.icon}
              alt={category.name}
              className="w-16 h-16 md:w-24 md:h-24 object-cover rounded-lg mx-auto"
            /> */}
            <p className="mt-2 text-sm font-medium">{category.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
