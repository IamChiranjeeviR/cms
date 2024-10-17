import React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Faculty from "../pages/FacultyLogin";
import AdminLayout from "../pages/admin/AdminLayout"; // Wrapper for Admin routes
import AdmissionAdmin from "../pages/admin/AdmissionAdmin";
import SuperAdmin from "../pages/admin/SuperAdmin";
import LibraryAdmin from "../pages/admin/LibraryAdmin";
import StdLogin from "../pages/StdLogin";
import Pannel from "../pages/Pannel"; // Import your Pannel component
import Footer from "@/components/Footer";
import Dashboard from "@/components/Dashboard";
import ApplicationManagement from "@/components/ApplicationManagement";
import Application from "@/pages/Application";

// CombinedRoutes.jsx (ProtectedRoute component)

const ProtectedRoute = ({ children, requiredRoles }) => {
  const jwtToken = localStorage.getItem("jwtToken"); // Make sure the key is correct
  const roles = JSON.parse(localStorage.getItem("roles")) || []; // Get roles from local storage

  // Check if user is logged in
  if (!jwtToken) {
    console.log("No JWT token found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // Check if the user has one of the required roles
  if (requiredRoles && !requiredRoles.some((role) => roles.includes(role))) {
    console.log("User does not have the required role, redirecting to /");
    return <Navigate to="/" replace />; // Redirect if unauthorized
  }

  return children;
};

const CombinedRoutes = () => {
  const location = useLocation();

  const hideComponents =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/login/student" ||
    location.pathname === "/login/faculty" ||
    location.pathname.startsWith("/login/admin/admissionAdmin") ||
    location.pathname.startsWith("/login/admin/superAdmin") ||
    location.pathname.startsWith("/login/admin/libraryAdmin") ||
    location.pathname.startsWith("/pannel");

  return (
    <div>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] ">
        {!hideComponents && <Navbar />}
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/application" element={<Application />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login Routes */}
          <Route path="/login" element={<Login />}>
            <Route path="admin" element={<AdminLayout />}>
              <Route path="admissionAdmin" element={<AdmissionAdmin />} />
              <Route path="superAdmin" element={<SuperAdmin />} />
              <Route path="libraryAdmin" element={<LibraryAdmin />} />
            </Route>
            <Route path="student" element={<StdLogin />} />
            <Route path="faculty" element={<Faculty />} />
          </Route>
        </Routes>
      </div>

      <Routes>
        {/* Protected Route for Pannel with nested routes */}
        <Route
          path="/pannel"
          element={
            <ProtectedRoute>
              <Pannel />
            </ProtectedRoute>
          }
        >
          {/* Nested Routes under Pannel */}
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route
            path="applicationManagement"
            element={<ApplicationManagement />}
          />
        </Route>

        {/* Protected Routes for Admins */}
        <Route
          path="/admin/admission"
          element={
            <ProtectedRoute requiredRoles={["ROLE_ADMISSION_ADMIN"]}>
              <AdmissionAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/super"
          element={
            <ProtectedRoute requiredRoles={["ROLE_SUPER_ADMIN"]}>
              <SuperAdmin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/library"
          element={
            <ProtectedRoute requiredRoles={["ROLE_LIBRARY_ADMIN"]}>
              <LibraryAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
      {!hideComponents && <Footer />}
    </div>
  );
};

export default CombinedRoutes;
