import React from "react";
import {
  Card,
  CardHeader,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = (portal) => {
    navigate(`/login/admin/${portal}`);
  };

  // Check if we are on a specific admin login path
  const isAdminLoginPath =
    location.pathname.startsWith("/login/admin/admissionAdmin") ||
    location.pathname.startsWith("/login/admin/superAdmin") ||
    location.pathname.startsWith("/login/admin/libraryAdmin");

  const handleBackClick = () => {
    navigate(`/login`);
    console.log(location.pathname);
  };
  return (
    <div>
      {!isAdminLoginPath ? (
        <div>
          <div className="my-10 flex flex-col items-center gap-10 md:flex-col lg:flex-row">
            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Admission Manager</CardTitle>
                <CardDescription>
                  Manage admissions, track information, etc.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("admissionAdmin")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Super Admin</CardTitle>
                <CardDescription>
                  Manage institutional operations.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("superAdmin")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>

            <Card className="w-[350px] transform transition-transform duration-300 hover:scale-105 hover:cursor-pointer">
              <CardHeader>
                <CardTitle>Library Manager</CardTitle>
                <CardDescription>Manage library and inventory.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLoginClick("libraryAdmin")}>
                  Click Here
                </Button>
              </CardFooter>
            </Card>
          </div>
          <Button onClick={handleBackClick}>Back</Button>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default AdminLayout;
