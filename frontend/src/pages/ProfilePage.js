import React, { useState, useEffect } from "react"; 
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    preferences: "",
    category: "",
    interest: "",
    profession: "",
  });
  
  const [editable, setEditable] = useState(false);
  const [timeTrigger, setTimeTrigger] = useState(""); // Time input for email trigger
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    if (!token) {
      navigate('/signup');
      return;
    }

    setProfile({
      name: userData.name || '',
      email: userData.email || '',
      preferences: userData.preference || '',
      religion: userData.category || '',
      interest: userData.interest || '',
      profession: userData.profession || '',
    });
    setTimeTrigger(userData.timeTrigger || '');

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user/${userId}`, {
          headers: {
            Authorization: token
          }
        });
        
        const userData = response.data.user;
        setProfile({
          name: userData.name,
          email: userData.email,
          preferences: userData.preference,
          religion: userData.category,
          interest: userData.interest,
          profession: userData.profession,
        });
        setTimeTrigger(userData.timeTrigger);
        
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };


    if (userId) { // Ensure userId is defined before making the API call
      fetchUserProfile();
    }
  }, [navigate]); 
  // Fetch when userId changes

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    try {
      await axios.post("/api/auth/updateProfile", {
        userId,
        ...profile,
        timeTrigger
      }, {
        headers: {
          Authorization: token
        }
      });

      localStorage.setItem('userData', JSON.stringify({
        ...profile,
        timeTrigger
      }));

      setEditable(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };


  const handleLogout = () => {
    // Clear the authentication token
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userData"); // Clear userId from local storage
    navigate("/signup"); // Redirect to login or landing page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-300 via-purple-100 to-purple-400 text-purple-900">
      <header className="bg-purple-600 text-white p-6 shadow-lg flex justify-between items-center">
        <h1 className="text-4xl font-bold">LunaQ - Profile</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </header>
      <main className="container mx-auto p-8 space-y-8">
        {/* Profile Information */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold mb-4 flex items-center">
            <FaUser className="mr-3" /> Profile Information
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold">Name:</label>
                {editable ? (
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{profile.name}</p>
                )}
              </div>

              <div>
                <label className="font-semibold">Email:</label>
                <p>{profile.email}</p>
              </div>

              <div>
                <label className="font-semibold">Preferences:</label>
                {editable ? (
                  <input
                    type="text"
                    name="preferences"
                    value={profile.preferences}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{profile.preferences}</p>
                )}
              </div>

              <div>
                <label className="font-semibold">Religion:</label>
                {editable ? (
                  <input
                    type="text"
                    name="religion"
                    value={profile.religion}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{profile.religion}</p>
                )}
              </div>

              <div>
                <label className="font-semibold">Interests:</label>
                {editable ? (
                  <input
                    type="text"
                    name="interest"
                    value={profile.interest}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{profile.interest}</p>
                )}
              </div>

              <div>
                <label className="font-semibold">Profession:</label>
                {editable ? (
                  <input
                    type="text"
                    name="profession"
                    value={profile.profession}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                ) : (
                  <p>{profile.profession}</p>
                )}
              </div>
            </div>

            {editable && (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Save Changes
              </button>
            )}

            {!editable && (
              <button
                onClick={() => setEditable(true)}
                className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        </section>

        {/* Email Notification Time Trigger Section */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">Set Time for Email Notification</h2>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="time"
              value={timeTrigger}
              onChange={(e) => setTimeTrigger(e.target.value)}
              className="w-full md:w-1/2 p-2 border border-purple-300 rounded"
            />
            <button
              onClick={() => alert(`Email will be sent at ${timeTrigger}`)}
              className="bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600"
            >
              Set Email Trigger
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
