// AdmissionAdmin.jsx

import React from "react";
import LoginForm from "@/components/LoginForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdmissionAdmin = () => {
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username: data.uniqueId,
        password: data.password,
      });

      if (response.status === 200) {
        const { token, roles } = response.data; // Adjust based on your response structure
        const role = roles[0].authority; // Assuming the first role is the primary one

        const existingTokens =
          JSON.parse(localStorage.getItem("jwtTokens")) || {};
        existingTokens[role] = token; // Store token by role

        localStorage.setItem("jwtToken", token); // Add this line

        console.log("Login successful");
        navigate("/pannel");
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle error (show notification, etc.)
    }
  };

  return <LoginForm onSubmit={handleLogin} />;
};

export default AdmissionAdmin;
