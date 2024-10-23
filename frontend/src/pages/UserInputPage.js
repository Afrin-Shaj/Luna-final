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

  const [timeTrigger, setTimeTrigger] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    setTimeout(() => {
      console.log("Automated email sent with user info:", formData);
      navigate('/homepage');
    }, 5000);

    if (timeTrigger) {
      const currentTime = new Date();
      const triggerTime = new Date();
      const [hours, minutes] = timeTrigger.split(":").map(Number);
      triggerTime.setHours(hours, minutes, 0, 0);

      const delay = triggerTime - currentTime;

      if (delay > 0) {
        setTimeout(() => {
          console.log("Scheduled email sent at:", timeTrigger, "with user info:", formData);
          alert(`Scheduled email sent at ${timeTrigger}`);
        }, delay);
      } else {
        console.error("Invalid time for email scheduling");
      }
    }
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
          {/* Interest input */}
          <div>
            <label htmlFor="interest" className="block text-gray-700 font-semibold mb-2">
              Interest (e.g., Sports, Technology, Art, Meme)
            </label>
            <input
              type="text"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your interests"
              required
            />
          </div>

          {/* Religion dropdown */}
          <div>
            <label htmlFor="religion" className="block text-gray-700 font-semibold mb-2">
              Category
            </label>
            <select
              id="religion"
              name="religion"
              value={formData.religion}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            >
              <option value="" disabled>Select your category</option>
              <option value="Quran">Quran</option>
              <option value="Bible">Bible</option>
              <option value="Bhagavad Gita">Bhagavad Gita</option>
              <option value="Thirukkural">Thirukkural</option>
              <option value="Random">Random</option>
            </select>
          </div>

          {/* Profession input */}
          <div>
            <label htmlFor="profession" className="block text-gray-700 font-semibold mb-2">
              Profession (e.g., Software Engineer, Teacher, Doctor)
            </label>
            <input
              type="text"
              id="profession"
              name="profession"
              value={formData.profession}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your profession"
              required
            />
          </div>

          {/* Preference input */}
          <div>
            <label htmlFor="preference" className="block text-gray-700 font-semibold mb-2">
              Preference (e.g., Motivational, Inspiring)
            </label>
            <input
              type="text"
              id="preference"
              name="preference"
              value={formData.preference}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your preferences"
              required
            />
          </div>

          {/* Time input for scheduling the email trigger */}
          <div>
            <label htmlFor="timeTrigger" className="block text-gray-700 font-semibold mb-2">
              Set Time for Email Trigger
            </label>
            <input
              type="time"
              id="timeTrigger"
              value={timeTrigger}
              onChange={(e) => setTimeTrigger(e.target.value)}
              className="w-full px-3 py-2 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Set Time for Email Trigger"
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>

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
