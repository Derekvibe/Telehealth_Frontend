import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL || 'https://telehealth-backend-2m1f.onrender.com/api/v1';

//for get token
// const API_URL1 = import.meta.env.VITE_API_URL1 || 'https://telehealth-backend-2m1f.onrender.com/api/v1/stream/get-token';
// 1. Create the context
const StreamContext = createContext();

// 2. Provider component
export const StreamProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const res = await axios.get(`${API_URL}/stream/get-token`, {
          withCredentials: true,
        });

        if (res.data?.user && res.data?.token) {
          setUser(res.data.user);
          setToken(res.data.token);
          console.log("Stream user/token:", res.data);
        } else {
          console.error("Token or user missing in response:", res.data);
        }
      } catch (error) {
        console.error("Error fetching Stream token:", error);
      }
    };

    fetchToken();
  }, []);

  //Log out Functionality
  const logout = async () => {
    try {
      await axios.post(`${API_URL}/users/logout`, {},
        {
          withCredentials: true
        });
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('streamToken');
      

      // Clear context
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // Expose Logout with capital L
  return (
    <StreamContext.Provider value={{ user, token, Logout:logout }}>
      {children}
    </StreamContext.Provider>
  );
};

// 3. Custom hook for easy access
export const useStream = () => useContext(StreamContext);
