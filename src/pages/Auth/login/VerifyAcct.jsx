import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { clearPendingEmail } from '../../../../store/authSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'; // adjust as needed
 

function VerifyAcct() {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useSelector((state) => state.auth.pendingEmail);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = code.join('');
    if (!email) {
      alert('Missing email. Please sign up again.');
      return navigate('/signup');
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/users/verify`, {
        email,
        otp,
      });
      dispatch(clearPendingEmail());
      alert('Account verified successfully!');
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;
    try {
      setResendLoading(true);
      await axios.post(`${API_URL}/users/resend-otp`, { email });
      setTimer(60);
      alert('OTP resent successfully');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 bg-white text-black">
        <div className="mb-8">
          <Link to="/">
            <img src="/Images/AskDoc_logo.png" alt="Ask Doc logo" className="h-20 w-auto" />
          </Link>
        </div>

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to AskDoc</h1>
          <p className="text-sm text-gray-600">
            Enter the code sent to your email to verify your account.
          </p>
        </div>

        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Verify Your Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex justify-between space-x-3 mb-6">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputsRef.current[index] = el)}
                  className="w-14 h-14 text-center text-xl border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white font-semibold py-2 rounded-md transition ${
                loading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-700'
              }`}
            >
              {loading ? 'Verifying...' : 'Submit'}
            </button>
          </form>

          {/* Resend Section */}
          <div className="text-center mt-4">
            <button
              onClick={handleResend}
              disabled={timer > 0 || resendLoading}
              className="text-sm text-blue-600 disabled:text-gray-400 hover:underline mt-2"
            >
              {resendLoading
                ? 'Resending...'
                : timer > 0
                ? `Resend code in ${timer}s`
                : 'Resend Code'}
            </button>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 hidden md:block">
        <img src="/Images/AuthBG/AuthBG1.jpg" alt="Docs Background" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

export default VerifyAcct;
