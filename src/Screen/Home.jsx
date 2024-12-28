import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import baseURL from '../assets/baseURL';
import Categories from '../components/Categories';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]); // Track visible products
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(16); // Track pagination index
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); // Track selected category ID

  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get search query from URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsResponse, categoriesResponse] = await Promise.all([
          fetch(`${baseURL}mainpost`),
          fetch(`${baseURL}categories`),
        ]);

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setFilteredProducts(productsData);
        setVisibleProducts(productsData.slice(0, 16));
        setCategories(categoriesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (query) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered);
      setVisibleProducts(filtered.slice(0, 16)); // Reset visible products for filtered data
      setCurrentIndex(16);
    } else if (selectedCategoryId) {
      const filtered = products.filter(
        (product) => product.category?._id === selectedCategoryId
      );
      setFilteredProducts(filtered);
      setVisibleProducts(filtered.slice(0, 16)); // Reset visible products for filtered data
      setCurrentIndex(16);
    } else {
      setFilteredProducts(products);
      setVisibleProducts(products.slice(0, 16));
      setCurrentIndex(16);
    }
  }, [query, selectedCategoryId, products]);

  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const handleLoadMore = () => {
    const newIndex = currentIndex + 16; // Load 16 more products
    setCurrentIndex(newIndex);
    setVisibleProducts(filteredProducts.slice(0, newIndex)); // Update visible products
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-slate-400 pt-20 pb-8">
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />

      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 pt-6 md:px-8">
        {loading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse max-w-sm bg-gray-300 border border-gray-200 rounded-lg shadow dark:bg-gray-700 dark:border-gray-600"
              >
                <div className="rounded-t-lg bg-gray-400 h-48 w-full"></div>
                <div className="p-5">
                  <div className="h-6 bg-gray-400 rounded mb-3"></div>
                  <div className="h-4 bg-gray-400 rounded mb-2"></div>
                  <div className="h-4 bg-gray-400 rounded w-2/3"></div>
                </div>
              </div>
            ))
          : visibleProducts.map((product) => (
            <div
            key={product._id}
            className="max-w-sm border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <div className="w-full aspect-w-4 aspect-h-3 overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.picture || 'https://via.placeholder.com/150'}
                alt={product.name}
              />
            </div>
            <div className="p-5">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {product.name}
              </h5>
              <p className="mb-3 font-semibold text-blue-700 dark:text-blue-300">
                Gh¢{product.price || 'N/A'}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
              >
                View Details
              </Link>
            </div>
          </div>
          
            ))}
      </div>

      {!loading && filteredProducts.length > visibleProducts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
