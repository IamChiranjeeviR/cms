import React from "react";
import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SuperAdmin = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: data.uniqueId,
        password: data.password,
      });

      if (response.status === 200) {
        const { token, roles } = response.data; // Destructure the response
        localStorage.setItem("jwtToken", token);

        // Save roles in local storage or state
        localStorage.setItem("roles", JSON.stringify(roles));
        console.log(token, roles);

        console.log("Login successful");
        // Navigate to the panel
        navigate("/pannel");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (show notification, etc.)
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default SuperAdmin;
