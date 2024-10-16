import React from "react";
import LoginForm from "@/components/LoginForm";
const FacultyLogin = () => {
  // Function to handle login form data
  const handleLogin = (data) => {
    console.log("Faculty Login Data:", data);
    // Perform actions with the data, e.g., authentication, API calls, etc.
  };
  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

export default FacultyLogin;
