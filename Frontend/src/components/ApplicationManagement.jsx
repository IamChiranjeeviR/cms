import React, { useEffect, useState } from "react";
import { ListFilter, Eye, CircleCheckBig, CircleX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import ViewApplication from "./ViewApplication";
import { useOutletContext } from "react-router-dom";

const ApplicationManagement = () => {
  const [applications, setApplications] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentTab, setCurrentTab] = useState("all");
  const { searchTerm } = useOutletContext();

  useEffect(() => {
    const fetchApplications = async () => {
      const jwtToken = localStorage.getItem("jwtToken"); // Retrieve token from local storage
      console.log("Retrieved Token"); // Debugging line

      if (!jwtToken) {
        console.error("JWT token not found. Cannot fetch applications.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/applications/all",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setApplications(response.data); // Set the applications data in state
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    fetchApplications(); // Fetch applications on component mount
  }, []);

  const handleStatus = async (applicationID, status) => {
    console.log(applicationID, status);
    const jwtToken = localStorage.getItem("jwtToken"); // Retrieve token from local storage
    console.log("Retrieved Token"); // Debugging line

    if (!jwtToken) {
      console.error("JWT token not found. Cannot fetch applications.");
      return;
    }

    try {
      const payload = JSON.stringify({
        status: status,
      });
      const CustomConfig = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `http://localhost:8080/api/v1/applications/${applicationID}/status`,
        payload,
        CustomConfig
      );
      console.log(response.status);
      if (response.status === 200) {
        // Update the local state with the new status after success
        setApplications((prevApplications) =>
          prevApplications.map((app) =>
            app.applicationId === applicationID
              ? { ...app, status } // Update only the application that matches the ID
              : app
          )
        );
      }
    } catch (error) {
      console.error("Error in Updating Application", error);
    }
  };

  // Function to sort applications by name
  const sortApplications = (order) => {
    const sortedApps = [...applications].sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      return order === "asc"
        ? aName.localeCompare(bName)
        : bName.localeCompare(aName);
    });
    setApplications(sortedApps);
  };

  // Handle sorting from dropdown menu
  const handleSortChange = (order) => {
    setSortOrder(order);
    sortApplications(order);
  };

  // Filter applications based on the current tab and search term
  const filteredApplications = applications.filter((application) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      application.applicationId.toString().includes(lowercasedSearchTerm) ||
      application.name.toLowerCase().includes(lowercasedSearchTerm) ||
      application.username.toLowerCase().includes(lowercasedSearchTerm);

    // Filter by current tab
    const matchesTab =
      currentTab === "all" || application.status.toLowerCase() === currentTab;

    return matchesSearchTerm && matchesTab; // Both conditions must be true
  });

  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 ">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="approved">Approved</TabsTrigger>
                  <TabsTrigger value="rejected" className="hidden sm:flex">
                    Rejected
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => handleSortChange("asc")}>
                        Sort by Name (A-Z)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSortChange("desc")}
                      >
                        Sort by Name (Z-A)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] sm:table-cell text-center">
                            <span>Application ID</span>
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Name
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Username
                          </TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Group
                          </TableHead>

                          <TableHead className="hidden md:table-cell text-center">
                            View
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications.map((application, index) => (
                          <TableRow key={application.applicationId}>
                            <TableCell className="sm:table-cell text-center font-bold">
                              {application.applicationId}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell font-medium text-center">
                              {application.name}
                            </TableCell>
                            <TableCell className="hidden sm:table-cell font-medium text-center">
                              {application.username}
                            </TableCell>
                            <TableCell className="text-center">
                              <Badge
                                variant="outline"
                                className={`text-sm text-black ${
                                  application.status === "PENDING"
                                    ? "border-orange-500"
                                    : application.status === "APPROVED"
                                    ? "border-green-500"
                                    : application.status === "REJECTED"
                                    ? "border-red-500"
                                    : ""
                                }`}
                              >
                                {application.status}
                              </Badge>
                            </TableCell>

                            <TableCell className="hidden md:table-cell text-center">
                              {application.degreeCourse
                                ? application.degreeCourse
                                : "BCA"}
                            </TableCell>

                            <TableCell className="table-cell">
                              <div className="flex justify-center">
                                <ViewApplication application={application} />
                              </div>
                            </TableCell>
                            <TableCell>
                              {application.status === "APPROVED" ? (
                                <div className="flex flex-row gap-3 justify-center">
                                  <span className="text-green-600 font-semibold text-xl">
                                    Approved
                                  </span>
                                  <CircleCheckBig className="text-green-600" />
                                </div>
                              ) : application.status === "REJECTED" ? (
                                <div className="flex flex-row gap-3 justify-center">
                                  <span className="text-red-600 font-semibold text-xl">
                                    Rejected
                                  </span>
                                  <CircleX className="text-red-600" />
                                </div>
                              ) : (
                                <div className="flex flex-row gap-1 justify-center">
                                  <Button
                                    className="bg-green-700"
                                    onClick={() =>
                                      handleStatus(
                                        application.applicationId,
                                        "APPROVED"
                                      )
                                    }
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    className="bg-red-600"
                                    onClick={() =>
                                      handleStatus(
                                        application.applicationId,
                                        "REJECTED"
                                      )
                                    }
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pending">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] sm:table-cell text-center">
                            <span>Application ID</span>
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Name
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Username
                          </TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Group
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            View
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications
                          .filter(
                            (application) => application.status === "PENDING"
                          ) // Filter for "PENDING" status
                          .map((application, index) => (
                            <TableRow key={application.applicationId}>
                              <TableCell className="sm:table-cell text-center font-bold">
                                {application.applicationId}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.name}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.username}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-sm text-black border-orange-500`}
                                >
                                  {application.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-center">
                                {application.degreeCourse
                                  ? application.degreeCourse
                                  : "BCA"}
                              </TableCell>
                              <TableCell className="table-cell">
                                <div className="flex justify-center">
                                  <ViewApplication application={application} />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-row gap-1 justify-center">
                                  <Button
                                    className="bg-green-700"
                                    onClick={() =>
                                      handleStatus(
                                        application.applicationId,
                                        "APPROVED"
                                      )
                                    }
                                  >
                                    Approve
                                  </Button>
                                  <Button
                                    className="bg-red-600"
                                    onClick={() =>
                                      handleStatus(
                                        application.applicationId,
                                        "REJECTED"
                                      )
                                    }
                                  >
                                    Reject
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="approved">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] sm:table-cell text-center">
                            <span>Application ID</span>
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Name
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Username
                          </TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Group
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            View
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications
                          .filter(
                            (application) => application.status === "APPROVED"
                          ) // Filter for "APPROVED" status
                          .map((application, index) => (
                            <TableRow key={application.applicationId}>
                              <TableCell className="sm:table-cell text-center font-bold">
                                {application.applicationId}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.name}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.username}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-sm text-black border-green-500`}
                                >
                                  {application.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-center">
                                {application.degreeCourse
                                  ? application.degreeCourse
                                  : "BCA"}
                              </TableCell>
                              <TableCell className="table-cell">
                                <div className="flex justify-center">
                                  <ViewApplication application={application} />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-row gap-3 justify-center">
                                  <span className="text-green-600 font-semibold text-xl">
                                    Approved
                                  </span>
                                  <CircleCheckBig className="text-green-600" />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rejected">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px] sm:table-cell text-center">
                            <span>Application ID</span>
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Name
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Username
                          </TableHead>
                          <TableHead className="text-center">Status</TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            Group
                          </TableHead>
                          <TableHead className="hidden md:table-cell text-center">
                            View
                          </TableHead>
                          <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredApplications
                          .filter(
                            (application) => application.status === "REJECTED"
                          ) // Filter for "REJECTED" status
                          .map((application, index) => (
                            <TableRow key={application.applicationId}>
                              <TableCell className="sm:table-cell text-center font-bold">
                                {application.applicationId}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.name}
                              </TableCell>
                              <TableCell className="hidden sm:table-cell font-medium text-center">
                                {application.username}
                              </TableCell>
                              <TableCell className="text-center">
                                <Badge
                                  variant="outline"
                                  className={`text-sm text-black border-red-500`}
                                >
                                  {application.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="hidden md:table-cell text-center">
                                {application.degreeCourse
                                  ? application.degreeCourse
                                  : "BCA"}
                              </TableCell>
                              <TableCell className="table-cell">
                                <div className="flex justify-center">
                                  <ViewApplication application={application} />
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex flex-row gap-3 justify-center">
                                  <span className="text-red-600 font-semibold text-xl">
                                    Rejected
                                  </span>
                                  <CircleX className="text-red-600" />
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
};

export default ApplicationManagement;
