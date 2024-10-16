import React from "react";
import Title from "@/components/Title";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = (portal) => {
    const path = portal === "admin" ? "/login/admin" : `/login/${portal}`;
    navigate(path);
  };

  // Check if we're on a specific login path (admin, student, or faculty)
  const isLoginPath =
    location.pathname.startsWith("/login/admin") ||
    location.pathname.startsWith("/login/student") ||
    location.pathname.startsWith("/login/faculty");

  return (
    <div>
      {!isLoginPath ? (
        <div>
          <div className="text-center text-3xl">
            <Title text1={"Login"} text2={"Here"} />
            <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
              Access your account using your registered credentials. Log in to
              manage your profile, view updates, and access personalized
              features based on your role, whether you're a student, teacher, or
              admin.
            </p>
          </div>

          <div className="my-10 flex flex-col items-center gap-10 md:flex-col lg:flex-row">
            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Admin</CardTitle>
                <CardDescription>
                  Manage institutional operations, oversee student and faculty
                  data.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("admin")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Student</CardTitle>
                <CardDescription>
                  Access your academic profile, view class schedules, register
                  for courses.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("student")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>
            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Lecturer/Teacher</CardTitle>
                <CardDescription>
                  Manage your courses, track student performance, streamline
                  activities.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("faculty")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Login;
