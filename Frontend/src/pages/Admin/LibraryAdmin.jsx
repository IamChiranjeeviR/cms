import React from "react";
import LoginForm from "@/components/LoginForm";

const LibraryAdmin = () => {
  const handleLogin = (data) => {
    console.log("Library Admin Login Data:", data);
    // Add your authentication logic here
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default LibraryAdmin;
