import React from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Eye } from "lucide-react";

const ViewApplication = ({ application }) => {
  const handleView = () => {
    console.log("Viewing application");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Eye
          className="cursor-pointer hover:scale-125 text-blue-600"
          onClick={handleView}
        />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold text-gray-800">
            Application Details of {application.applicationId}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <div className="max-h-96 overflow-y-auto space-y-4">
            <p className="text-gray-700">
              <strong>Application ID:</strong> {application.applicationId}
            </p>
            <p className="text-gray-700">
              <strong>Name:</strong> {application.name}
            </p>
            <p className="text-gray-700">
              <strong>Username:</strong> {application.username}
            </p>
            <p className="text-gray-700">
              <strong>Date of Birth:</strong>{" "}
              {new Date(application.dateOfBirth).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
              <strong>Gender:</strong> {application.gender}
            </p>
            <p className="text-gray-700">
              <strong>Nationality:</strong> {application.nationality}
            </p>
            <p className="text-gray-700">
              <strong>Religion:</strong> {application.religion}
            </p>
            <p className="text-gray-700">
              <strong>Guardian Name:</strong> {application.guardianName}
            </p>
            <p className="text-gray-700">
              <strong>Guardian Phone:</strong> {application.guardianPhone}
            </p>
            <p className="text-gray-700">
              <strong>Primary Phone:</strong> {application.primaryPhone}
            </p>
            <p className="text-gray-700">
              <strong>Secondary Phone:</strong> {application.secondaryPhone}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {application.email}
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> {application.address}
            </p>
            <p className="text-gray-700">
              <strong>Degree Course:</strong> {application.degreeCourse}
            </p>
            <p className="text-gray-700">
              <strong>SSC School:</strong> {application.sscSchool}
            </p>
            <p className="text-gray-700">
              <strong>SSC Marks:</strong> {application.sscMarks}
            </p>
            <p className="text-gray-700">
              <strong>SSC Year of Passing:</strong>{" "}
              {application.sscYearOfPassing}
            </p>
            <p className="text-gray-700">
              <strong>Intermediate College:</strong>{" "}
              {application.intermediateCollege}
            </p>
            <p className="text-gray-700">
              <strong>Intermediate Marks:</strong>{" "}
              {application.intermediateMarks}
            </p>
            <p className="text-gray-700">
              <strong>Intermediate Year of Passing:</strong>{" "}
              {application.intermediateYearOfPassing}
            </p>
            <p className="text-gray-700">
              <strong>Second Language:</strong> {application.secondLanguage}
            </p>
            <p className="text-gray-700">
              <strong>Student Aadhaar:</strong> {application.studentAadhaar}
            </p>
            <p className="text-gray-700">
              <strong>Mother Aadhaar:</strong> {application.motherAadhaar}
            </p>
            <p className="text-gray-700">
              <strong>Status:</strong> {application.status}
            </p>
          </div>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-blue-600 hover:text-blue-800">
            Close
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ViewApplication;
