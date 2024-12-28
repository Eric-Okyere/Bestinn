import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.jpg";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarCompo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const navigate = useNavigate(); // For navigation

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle search when Enter key is pressed
  const handleSearchOnEnter = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`); // Redirect to search page with query
    }
  };

  // Handle search when search button is clicked
  const handleSearchOnClick = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery.trim()}`); // Redirect to search page with query
    }
  };

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full flex items-center justify-between bg-gray-100 p-4 shadow-md z-50">
        {/* Logo and Title */}
        <Link to="/">
          <div className="flex items-center">
            <img
              src={Logo}
              className="h-12 w-12 mr-2 rounded-full md:w-16 md:h-16 animate-rotate"
              alt="logo"
            />
            <h1 className="hidden md:flex mx-10 text-black text-2xl font-bold font-serif">
              Bestinn Mobile
            </h1>
          </div>
        </Link>

        {/* Search Input with Button */}
        <div className="md:ml-56 items-center flex-grow flex">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 md:w-96 rounded-lg border border-gray-300 focus:outline-none focus:ring focus:ring-blue-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchOnEnter} // Trigger search on Enter key
          />
          <button
            onClick={handleSearchOnClick} // Trigger search on button click
            className="ml-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800"
          >
            Search
          </button>
        </div>

        {/* Hamburger Icon for Small Screens */}
        <button
          className="text-2xl md:hidden text-black"
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gray-100 shadow-md md:static md:flex md:space-x-6 md:items-center md:shadow-none`}
        >
          <Link
            to="/post"
            className="block px-4 py-2 text-black hover:text-blue-500 text-lg md:inline-block md:ml-auto"
            onClick={() => setIsOpen(false)}
          >
            Post
          </Link>
          <Link
            to="/dash"
            className="block px-4 py-2 text-black hover:text-blue-500 text-lg md:inline-block md:ml-auto"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavbarCompo;
