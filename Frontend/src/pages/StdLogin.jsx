import React from "react";
import LoginForm from "@/components/LoginForm";
const StdLogin = () => {
  // Function to handle login form data
  const handleLogin = (data) => {
    console.log("Student Login Data:", data);
    // Perform actions with the data, e.g., authentication, API calls, etc.
  };
  return (
    <>
      <LoginForm onSubmit={handleLogin} />
    </>
  );
};

export default StdLogin;
