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
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <Eye
            className="cursor-pointer hover:scale-125 text-blue-600 transition-transform duration-150"
            onClick={handleView}
          />
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white rounded-lg shadow-lg p-6 max-w-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold text-gray-800">
              Application Details of {application.applicationId}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription asChild>
            <div className="max-h-96 overflow-y-auto space-y-4">
              <div className="text-gray-700">
                <strong>Application ID:</strong> {application.applicationId}
              </div>
              <div className="text-gray-700">
                <strong>Name:</strong> {application.name}
              </div>
              <div className="text-gray-700">
                <strong>Username:</strong> {application.username}
              </div>
              <div className="text-gray-700">
                <strong>Date of Birth:</strong>{" "}
                {new Date(application.dateOfBirth).toLocaleDateString()}
              </div>
              <div className="text-gray-700">
                <strong>Gender:</strong> {application.gender}
              </div>
              <div className="text-gray-700">
                <strong>Nationality:</strong> {application.nationality}
              </div>
              <div className="text-gray-700">
                <strong>Religion:</strong> {application.religion}
              </div>
              <div className="text-gray-700">
                <strong>Guardian Name:</strong> {application.guardianName}
              </div>
              <div className="text-gray-700">
                <strong>Guardian Phone:</strong> {application.guardianPhone}
              </div>
              <div className="text-gray-700">
                <strong>Primary Phone:</strong> {application.primaryPhone}
              </div>
              <div className="text-gray-700">
                <strong>Secondary Phone:</strong> {application.secondaryPhone}
              </div>
              <div className="text-gray-700">
                <strong>Email:</strong> {application.email}
              </div>
              <div className="text-gray-700">
                <strong>Address:</strong> {application.address}
              </div>
              <div className="text-gray-700">
                <strong>Degree Course:</strong> {application.degreeCourse}
              </div>
              <div className="text-gray-700">
                <strong>SSC School:</strong> {application.sscSchool}
              </div>
              <div className="text-gray-700">
                <strong>SSC Marks:</strong> {application.sscMarks}
              </div>
              <div className="text-gray-700">
                <strong>SSC Year of Passing:</strong>
                {application.sscYearOfPassing}
              </div>
              <div className="text-gray-700">
                <strong>Intermediate College:</strong>
                {application.intermediateCollege}
              </div>
              <div className="text-gray-700">
                <strong>Intermediate Marks:</strong>
                {application.intermediateMarks}
              </div>
              <div className="text-gray-700">
                <strong>Intermediate Year of Passing:</strong>
                {application.intermediateYearOfPassing}
              </div>
              <div className="text-gray-700">
                <strong>Second Language:</strong> {application.secondLanguage}
              </div>
              <div className="text-gray-700">
                <strong>Student Aadhaar:</strong> {application.studentAadhaar}
              </div>
              <div className="text-gray-700">
                <strong>Mother Aadhaar:</strong> {application.motherAadhaar}
              </div>
              <div className="text-gray-700">
                <strong>Status:</strong> {application.status}
              </div>
            </div>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-blue-600 hover:text-blue-800 transition-colors duration-150">
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ViewApplication;
