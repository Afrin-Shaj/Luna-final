import React, { createContext, useContext, useState } from 'react';

// Create a Context for the user profile
const ProfileContext = createContext();

// Create a Provider component
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    name: "Luna",
    email: "luna@example.com",
    preferences: "Motivation, Self-improvement",
    religion: "Christianity",
    interest: "Sports, Meme",
    profession: "Software Engineer",
  });

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Create a custom hook to use the ProfileContext
export const useProfile = () => {
  return useContext(ProfileContext);
};

// Export the ProfileContext for potential use in other components
export default ProfileContext;
