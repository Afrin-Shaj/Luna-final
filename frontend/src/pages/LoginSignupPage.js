import { useState } from 'react';
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const LoginSignupPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      // Reset form and errors after submission
      setUsername("");
      setEmail("");
      setPassword("");
      setErrors({});
    }, 2000);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    if (field === "username") setUsername(value);
    if (field === "email") {
      setEmail(value);
      if (!validateEmail(value) && value !== "") {
        setErrors({ ...errors, email: "Invalid email format" });
      } else {
        setErrors({ ...errors, email: null });
      }
    }
    if (field === "password") {
      setPassword(value);
      if (value.length < 8 && value !== "") {
        setErrors({ ...errors, password: "Password must be at least 8 characters" });
      } else {
        setErrors({ ...errors, password: null });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-700 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-purple-800 mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => handleInputChange(e, "username")}
                className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
                placeholder="johndoe"
                autoComplete="username"
                aria-label="Username"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => handleInputChange(e, "email")}
              className={`mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${
                errors.email ? "border-red-500" : "border-gray-300 focus:border-purple-500"
              }`}
              placeholder="you@example.com"
              autoComplete="email"
              aria-label="Email"
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => handleInputChange(e, "password")}
                className={`mt-2 block w-full rounded-md shadow-sm focus:ring focus:ring-purple-500 focus:ring-opacity-50 transition duration-150 ease-in-out ${
                  errors.password ? "border-red-500" : "border-gray-300 focus:border-purple-500"
                }`}
                placeholder="••••••••"
                autoComplete="current-password"
                aria-label="Password"
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "password-error" : undefined}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <FaEye className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
            {errors.password && (
              <p id="password-error" className="mt-2 text-sm text-red-600" role="alert">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out"
              disabled={loading}
            >
              {loading ? (
                <FaSpinner className="animate-spin h-5 w-5 mr-3" />
              ) : (
                isLogin ? "Login" : "Sign Up"
              )}
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-purple-600 hover:text-purple-500 focus:outline-none focus:underline transition ease-in-out duration-150"
          >
            {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginSignupPage;
