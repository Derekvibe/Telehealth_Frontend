// components/useLogout.js
import { useStream } from "./StreamContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCallback } from "react";

const API_URL = import.meta.env.VITE_API_URL;

const useLogout = () => {
  const { setUser, setToken } = useStream();
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    try {
      // Call backend logout endpoint.
      // Your logout endpoint resets the cookie to "loggedout" so that it expires shortly.
      await axios.get(`${API_URL}/users/logout`, {
        withCredentials: true,
      });

      // Optionally clear items stored in localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("streamToken");

      // Clear global state
      setUser(null);
      setToken(null);

      // Navigate the user to the login page (or any other public page)
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }, [setUser, setToken, navigate]);

  return logout;
};

export default useLogout;
