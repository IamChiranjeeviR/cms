// AdmissionAdmin.jsx

import React, { useEffect } from "react";
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
        const { token, roles } = response.data; // Assuming your API returns this structure

        // Store token and roles in local storage
        localStorage.setItem("jwtToken", token); // Use the correct key
        localStorage.setItem("roles", JSON.stringify(roles));

        console.log("Login successful, token stored:", token);
        navigate("/pannel"); // Navigate to Pannel after successful login
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Optionally show a notification or alert here
    }
  };

  // Check if token exists to navigate to Pannel
  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      console.log("Token exists, navigating to /pannel");
      navigate("/pannel"); // Navigate if token exists
    }
  }, [navigate]); // Include navigate in the dependency array to avoid linting warnings

  return <LoginForm onSubmit={handleLogin} />;
};

export default AdmissionAdmin;
