import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import baseURL from '../assets/baseURL';

const ProductDetail = () => {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // This hook gives us the current location (URL) of the page

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`${baseURL}mainpost/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data.product);
        setRelatedProducts(data.relatedProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Scroll to the top whenever the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Gather the images (picture and picturesec)
  const images = [product.picture, product.picturesec].filter(Boolean);

  return (
    <div className="container mx-auto p-8">
      {/* Product Details */}
      <div className="flex flex-col md:flex-row bg-[#f4f3f3] py-4 rounded-lg">
        <div className="w-full md:w-1/2">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]} // Added Autoplay module
            pagination={{ clickable: true }}
            navigation
            autoplay={{
              delay: 3000, // Change slide every 3 seconds
              disableOnInteraction: false, // Keep autoplay even if user interacts with the slider
            }}
            className="relative overflow-hidden rounded-lg"
          >
        {images.length > 0 ? (
          images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <img
                className="object-contain w-[90%] max-h-[85vh] mx-auto md:mx-36   rounded-lg md:w-3/4 md:max-h-[70vh] lg:w-2/3 lg:max-h-[60vh]"
                src={image}
                alt={`Slide ${index}`}
              />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide className="flex justify-center items-center">
            <img
              className="object-contain w-[90%] max-h-[85vh] rounded-lg  md:w-3/4 md:max-h-[70vh] lg:w-2/3 lg:max-h-[60vh]"
              src="https://via.placeholder.com/300"
              alt="Placeholder"
            />
          </SwiperSlide>
        )}



          </Swiper>
        </div>
        <div className="w-full md:w-1/2 md:pl-8 mx-4">
          <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
          <p className="text-lg font-semibold text-blue-700 mb-4">
            Price: Gh¢{product.price || 'N/A'}
          </p>

          <p className="text-gray-600 mb-4">Sim: {product?.sim}</p>
          <p className="text-gray-600 mb-4">Battery: {product?.battery}</p>
          <p className="text-gray-600 mb-4">RAM: {product?.ram}</p>
          <p className="text-gray-600 mb-4">Sensor: {product?.sensor}</p>
          <p className="text-gray-600 mb-4">Resolution: {product?.resolution}</p>
          <p className="text-gray-600 mb-4">Camera: {product?.camera}</p>
          <p className="text-gray-600 mb-4">Description: {product.description}</p>

          {/* Add to Cart Button */}
          <div className="mt-6">
            <button
              onClick={() => alert('Product added to cart!')}
              className="px-6 py-2 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800"
            >
              Buy later
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Related Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((related) => (
            <div
              key={related._id}
              className="border border-gray-200 rounded-lg shadow"
            >
              <img
                className="rounded-t-lg"
                src={related.picture || 'https://via.placeholder.com/150'}
                alt={related.name}
              />
              <div className="p-4">
                <h5 className="text-lg font-bold">{related.name}</h5>
                <p className="text-blue-700 font-semibold">
                  Gh¢{related.price || 'N/A'}
                </p>
                <Link
                  to={`/product/${related._id}`} // Links to the detail page of the related product
                  className="inline-block mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
