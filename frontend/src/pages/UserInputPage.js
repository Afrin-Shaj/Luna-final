import React, { useState } from 'react'; 
import { FaMoon, FaBook, FaPrayingHands, FaHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const UserInputPage = () => {
  const [formData, setFormData] = useState({
    interest: "",
    religion: "",
    profession: "",
    preference: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // React Router's navigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true); // Show loading state
    
    // Simulate email sending process with a time delay
    setTimeout(() => {
      // Simulate email trigger with user info logged in console
      console.log("Automated email sent with user info:", formData);

      // After sending the email, navigate to the homepage
      navigate('/homepage');
    }, 5000);  // Delay of 5 seconds (simulates email sending delay)
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-purple-500 relative overflow-hidden py-12">
      <div className="flex items-center justify-center mb-8 z-10">
        <FaMoon className="text-white text-4xl mr-2" />
        <h1 className="text-white text-5xl font-bold">LunaQ</h1>
      </div>

      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative z-10">
        <h2 className="text-3xl font-bold text-center mb-2">User Information</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="interest" className="sr-only">Interest</label>
            <input
              type="text"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Interest"
              required
            />
          </div>
          <div>
            <label htmlFor="religion" className="sr-only">Religion</label>
            <input
              type="text"
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Religion"
              required
            />
          </div>
          <div>
            <label htmlFor="profession" className="sr-only">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Profession"
              required
            />
          </div>
          <div>
            <label htmlFor="preference" className="sr-only">Preference</label>
            <input
              type="text"
              id="preference"
              name="preference"
              value={formData.preference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Preference"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}  // Disable button when loading
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {/* Modern Footer with interactive flipping cards */}
      <footer className="w-full bg-purple-700 text-white py-8 mt-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-purple-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="text-center">
              <FaBook className="text-5xl text-white mb-4 group-hover:text-yellow-400 transition duration-300" />
              <h3 className="text-xl font-semibold mb-2">Holy Books</h3>
              <p className="text-gray-300 group-hover:text-gray-100">Explore wisdom from sacred texts that have stood the test of time.</p>
            </div>
          </div>
          
          {/* Card 2 */}
          <div className="group bg-purple-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="text-center">
              <FaPrayingHands className="text-5xl text-white mb-4 group-hover:text-yellow-400 transition duration-300" />
              <h3 className="text-xl font-semibold mb-2">Spiritual Insights</h3>
              <p className="text-gray-300 group-hover:text-gray-100">Personalized spiritual quotes crafted just for your journey.</p>
            </div>
          </div>
          
          {/* Card 3 */}
          <div className="group bg-purple-800 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
            <div className="text-center">
              <FaHeart className="text-5xl text-white mb-4 group-hover:text-yellow-400 transition duration-300" />
              <h3 className="text-xl font-semibold mb-2">Inspiration for Life</h3>
              <p className="text-gray-300 group-hover:text-gray-100">Get inspired with quotes that touch your heart and mind.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserInputPage;