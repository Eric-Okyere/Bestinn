import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import baseURL from '../assets/baseURL'; // Assuming baseURL points to the API endpoint

const Search = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query'); // Get the query from the URL
  const [products, setProducts] = useState([]); // Store products data
  const [filteredProducts, setFilteredProducts] = useState([]); // Filtered products based on search
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${baseURL}send`); // Fetch all products
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data); // Store all products
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (query && products.length > 0) {
      // Filter products by search query
      const result = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) // Match products by name
      );
      setFilteredProducts(result);
    }
  }, [query, products]); // Re-run the filter if the query or products change

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-200 min-h-screen pt-20 pb-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Search Results</h1>
        <p className="text-gray-600 mb-8">Results for: <span className="font-semibold">{query}</span></p>
        
        {/* Display filtered products */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md"
              >
                <img
                  className="rounded-t-lg w-full object-cover h-48"
                  src={product.picture || 'https://via.placeholder.com/150'}
                  alt={product.name}
                />
                <div className="p-5">
                  <h5 className="mb-2 text-xl font-bold text-gray-900">{product.name}</h5>
                  <p className="text-lg text-blue-700">Gh¢{product.price || 'N/A'}</p>
                  <Link  to={`/product/${product.id}`}
                    className="mt-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products found for "{query}"</p>
        )}
      </div>
    </div>
  );
};

export default Search;
