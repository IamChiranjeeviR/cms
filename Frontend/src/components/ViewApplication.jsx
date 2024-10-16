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
        <AlertDialogTrigger asChild>
          <Eye
            className="cursor-pointer hover:scale-125"
            onClick={() => handleView}
          />
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Application Details of {application.applicationId}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {application.applicationId}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ViewApplication;
