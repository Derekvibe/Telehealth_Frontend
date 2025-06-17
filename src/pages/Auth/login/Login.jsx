import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

function Join() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await axios.post(`${API_URL}/users/login`, formData, {
        withCredentials: true,
      });
  
      if (res.data.status === 'success') {
        const { token, user, streamToken } = res.data;

        // console.log (token)
        // console.log (user)
        
  
        // Save to localStorage
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('streamToken', streamToken);
  
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form Section */}
      <div className="w-full md:w-1/2 bg-white text-black flex flex-col justify-center px-6 py-12">
        {/* Logo */}
        <div className="flex justify-start mb-8">
          <Link to="/">
            <img
              src="/Images/AskDoc_logo.png"
              alt="Ask Doc logo"
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Welcome Text */}
        <div className="text-left mb-6 px-2">
          <h1 className="text-3xl font-bold mb-2">Welcome to AskDoc</h1>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 mb-3">{error}</p>}

        {/* Form Section */}
        <form className="space-y-5 w-full px-2" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgotPass"
              className="text-gray-600 hover:text-blue-600 text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              {loading ? 'Logging in...' : 'Submit'}
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Join
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side - Image Section */}
      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src="/Images/AuthBG/AuthBG1.jpg"
          alt="Docs Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default Join;
