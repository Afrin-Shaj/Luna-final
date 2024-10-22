// SignupPage.js
import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSpinner, FaMoon } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Email validation
  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  // Handle input changes and validate
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation
    if (name === "email") {
      if (!validateEmail(value) && value !== "") {
        setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
      } else {
        setErrors((prev) => ({ ...prev, email: null }));
      }
    }
    if (name === "password") {
      if (value.length < 8 && value !== "") {
        setErrors((prev) => ({ ...prev, password: "Password must be at least 8 characters" }));
      } else {
        setErrors((prev) => ({ ...prev, password: null }));
      }
    }
  };

  // Handle form submit (signup)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const apiUrl = '/api/auth/signup';
    const payload = {
      name: formData.Name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await axios.post(apiUrl, payload);
      localStorage.setItem('token', res.data.token);  // Store token on successful signup

      // Reset form and navigate
      setFormData({ Name: "", email: "", password: "" });
      setErrors({});
      setLoading(false);
      navigate("/user-input");  // Navigate to user input on signup
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        setErrors((prev) => ({ ...prev, form: err.response.data.msg }));
      } else {
        setErrors((prev) => ({ ...prev, form: "Something went wrong!" }));
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-purple-500 relative overflow-hidden py-12">
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute bottom-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="rgba(76, 29, 149, 0.5)" fillOpacity="1" d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="flex items-center justify-center mb-8 z-10">
        <FaMoon className="text-white text-4xl mr-2" />
        <h1 className="text-white text-5xl font-bold">LunaQ</h1>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2">Sign up</h2>
        <p className="text-center text-gray-600 mb-6">Create a new LunaQ account</p>

        <button className="w-full py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center mb-6 hover:bg-gray-50 transition-colors">
          <FcGoogle className="mr-2" />
          <span>Sign up with Google</span>
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="Name" className="sr-only">Name</label>
            <input
              type="text"
              id="Name"
              name="Name"
              value={formData.Name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Name*"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              placeholder="Email*"
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 ${errors.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="Password*"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? <FaEyeSlash className="h-5 w-5 text-gray-400" /> : <FaEye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? <FaSpinner className="animate-spin h-5 w-5 mr-3" /> : "Sign up"}
            </button>
          </div>
        </form>

        {/* Form error */}
        {errors.form && <p className="mt-2 text-center text-red-600">{errors.form}</p>}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate("/")}  // Navigate to login
            className="text-sm font-medium text-purple-600 hover:text-purple-500"
          >
            Already have an account? Log In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
