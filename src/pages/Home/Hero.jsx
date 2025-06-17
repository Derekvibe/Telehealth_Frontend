import React from 'react';
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-white py-12">
      <div className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12">
        {/* Left Content */}
        <div className="p-8 md:w-1/2 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl font-bold text-gray-800 leading-tight mb-4 ">
            Our HealthCare <br /> Solutions Meet <br /> Every Need
          </h1>
          <p className="text-gray-600 mb-6">
            With a team of experienced professionals and cutting-edge technology,
            we strive to empower individuals.
          </p>
          <Link  to="/signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition sm:hidden md:flex">
            Get Started
          </button>
          </Link>
          
        </div>

        {/* Right Image */}
        <div className="md:w-1/2">
          <img
            src="/Images/HeroImage.png"
            alt="Docs Image"
            className="h-auto max-w-full object-contain"
          />
        </div>

        <Link  to="/signup">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-gray-700 transition md:hidden mt-8">
            Get Started
          </button>
          </Link>
      </div>
    </section>
  );
}

export default Hero;
