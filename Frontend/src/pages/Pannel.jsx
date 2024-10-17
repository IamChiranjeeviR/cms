// Pannel.jsx
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { CircleUser, Home, Menu, Package2, FileUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";

const Pannel = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleLogout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");

    if (jwtToken) {
      try {
        await axios.post(
          "http://localhost:8080/auth/logout",
          {},
          {
            headers: { Authorization: `Bearer ${jwtToken}` },
          }
        );
        console.log("Logout successful");

        // Clear local storage and redirect to login only after a successful logout
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("roles");
        window.location.href = "/login";
      } catch (error) {
        console.error("Logout failed:", error);
        // Optionally, notify the user
        alert("Logout failed, please try again.");
      }
    } else {
      // If no token is found, redirect immediately
      window.location.href = "/login";
    }
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div
        className={`grid min-h-screen w-full ${
          isCollapsed
            ? "md:grid-cols-[80px_1fr] lg:grid-cols-[80px_1fr]"
            : "md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
        }`}
      >
        {/* Sidebar */}
        <div
          className={`${
            isCollapsed ? "w-[80px]" : "w-[220px] lg:w-[280px]"
          } hidden border-r bg-muted/40 md:block transition-all duration-300`}
          style={{ position: "sticky", top: 0, height: "100vh" }}
        >
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <button
                onClick={toggleCollapse}
                className="flex items-center gap-2 font-semibold"
              >
                <Package2 className="h-7 w-7" />
                {!isCollapsed && <span>Admission Admin</span>}
              </button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                <Link
                  to="/pannel/dashboard"
                  className="flex items-center gap-3 rounded-lg px-3 py-5 text-muted-foreground transition-all hover:text-primary text-xl"
                >
                  <Home className="h-6 w-6" />
                  {!isCollapsed && <span>Dashboard</span>}
                </Link>
                <Link
                  to="/pannel/applicationManagement"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary text-xl"
                >
                  <FileUser className="h-6 w-6" />
                  {!isCollapsed && <span>Applications</span>}
                </Link>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-col">
          {/* Header (Sticky) */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <SheetTitle className="hidden">Navigation</SheetTitle>
                <SheetDescription className="hidden">side nav</SheetDescription>
                <nav className="grid gap-2 text-lg font-medium">
                  <Link
                    to="/pannel/dashboard"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    <Package2 className="h-7 w-7" />
                    <span>Admission Admin</span>
                  </Link>
                  <Link
                    to="/pannel/dashboard"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 pt-10 text-muted-foreground hover:text-foreground text-xl"
                  >
                    <Home className="h-6 w-6" />
                    Dashboard
                  </Link>
                  <Link
                    to="/pannel/applicationManagement"
                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-5 text-muted-foreground hover:text-foreground text-xl"
                  >
                    <FileUser className="h-6 w-6" />
                    Applications
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search Applications..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>

          {/* Scrollable content */}
          <div className="overflow-y-auto h-full p-4">
            <Outlet context={{ searchTerm }} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Pannel;
