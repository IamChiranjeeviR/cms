import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  CreditCard,
  Users,
  FileUser,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

const Dashboard = () => {
  const [totalCount, setTotalCount] = useState({});
  const [pendingCount, setPendingCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchTotalCount = async () => {
      const jwtToken = localStorage.getItem("jwtToken");
      if (!jwtToken) {
        console.error("JWT token not found. Cannot fetch applications.");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/applications/count",
          {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        setTotalCount(response.data);
      } catch (error) {
        console.error("Error fetching applications", error);
      }
    };

    const fetchStatusCount = async (status) => {
      console.log(status);
      const jwtToken = localStorage.getItem("jwtToken");
      console.log("Retrieved Token");

      if (!jwtToken) {
        console.error("JWT token not found. Cannot fetch applications.");
        return;
      }
      const CustomConfig = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      };

      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/applications/count/${status}`,
          CustomConfig
        );

        if (!response.status == 200) {
          throw new Error(
            `Error fetching ${status} count: ${response.statusText}`
          );
        }

        const data = await response.data;
        return data;
      } catch (error) {
        console.error(`Error fetching ${status} count`, error);
      }
    };

    const fetchAllStatusCounts = async () => {
      const pending = await fetchStatusCount("PENDING");
      const accepted = await fetchStatusCount("APPROVED");
      const rejected = await fetchStatusCount("REJECTED");

      setPendingCount(pending?.count || 0);
      setAcceptedCount(accepted?.count || 0);
      setRejectedCount(rejected?.count || 0);
    };

    fetchTotalCount();
    fetchAllStatusCounts();
  }, []);

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

  return (
    <>
      <div className="flex min-h-screen w-full flex-col">
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <Card x-chunk="dashboard-01-chunk-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Applications
                </CardTitle>
                <FileUser className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCount.count}</div>
                <p className="text-xs text-muted-foreground">
                  +20.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCount}</div>
                <p className="text-xs text-muted-foreground">
                  +180.1% from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{acceptedCount}</div>
                <p className="text-xs text-muted-foreground">
                  +19% from last month
                </p>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-01-chunk-3">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{rejectedCount}</div>
                <p className="text-xs text-muted-foreground">
                  +201 since last hour
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
              <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                  <CardTitle>Pending Applications</CardTitle>
                  <CardDescription>Applications from CMS.</CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                  <Link to="/pannel/applicationManagement">
                    View All
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="text-right">Group</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {applications
                      .filter((application) => application.status === "PENDING")
                      .slice(0, 5)
                      .map((application) => (
                        <TableRow key={application.applicationId}>
                          <TableCell>
                            <div className="font-medium">
                              {application.name}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline">
                              {application.email}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {application.degreeCourse}
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card x-chunk="dashboard-01-chunk-4" className="overflow-auto">
              <CardHeader>
                <CardTitle>Recent Approvals</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-8">
                {applications
                  .filter((application) => application.status === "APPROVED")
                  .slice(0, 5)
                  .map((application) => (
                    <div
                      className="flex items-center gap-4"
                      key={application.id}
                    >
                      <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">
                          {application.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {application.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        {application.degreeCourse}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
