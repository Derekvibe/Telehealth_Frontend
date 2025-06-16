import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

function ForgotPass() {
  const [code, setCode] = useState(['', '', '', ''])
  const inputsRef = useRef([])

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)
    if (value && index < 3) {
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const token = code.join('')
    console.log('Submitted Token:', token)
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Logo + Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 py-12 bg-white text-black">
        {/* Logo */}
        <div className="mb-8">
        <Link to="/">
          <img
            src="/Images/AskDoc_logo.png"
            alt="Ask Doc logo"
            className="h-20 w-auto"
            />
            </Link>
        </div>

        {/* Welcome Text */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Welcome to AskDoc</h1>
          <p className="text-sm text-gray-600">
            Enter your Forget Password Token
          </p>
        </div>

        {/* Token Input Form */}
        <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Enter Verification Code
          </h2>
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
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Verify Token
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src="/Images/AuthBG/AuthBG1.jpg"
          alt="Docs Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
}

export default ForgotPass
