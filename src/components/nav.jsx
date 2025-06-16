import React, { useState } from "react";
import { Link } from "react-router-dom";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="sticky bg-gray-300 top-0 z-50  mx-auto">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo */}
          <div>
            <Link to="/">
            <img
              src="/Images/AskDoc_logo.png"
              alt="Ask Doc logo"
              className="h-28 w-auto"
            />

            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/signup"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition hover:text-green-500 "
            >
              Join
            </Link>

            <Link
              to="/login"
              className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white shadow px-4 pt-2 pb-4 space-y-2">
            <Link
              to="/"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="block text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>

            <Link
              to="/signup"
              className="block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Join
            </Link>

            <Link
              to="/login"
              className="block border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}

export default Nav;
