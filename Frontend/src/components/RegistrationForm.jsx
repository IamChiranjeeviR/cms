import React from "react";
import { useState, forwardRef } from "react";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useForm, Controller } from "react-hook-form";

const RegistrationForm = ({ onSubmit }) => {
  const [activeTab, setActiveTab] = useState("personal_info");
  const [formData, setFormData] = useState({});
  const [date, setDate] = React.useState(null);
  const tabs = [
    "personal_info",
    "academic_info",
    "admission_info",
    "declaration",
  ];
  const {
    register: registerPersonal,
    handleSubmit: handleSubmitPersonal,
    formState: { errors: errorsPersonal, isSubmitting: isSubmittingPersonal },
    setValue,
  } = useForm();
  const {
    register: registerAcademic,
    handleSubmit: handleSubmitAcademic,
    formState: { errors: errorsAcademic, isSubmitting: isSubmittingAcademic },
  } = useForm();
  const {
    register: registerAdmission,
    handleSubmit: handleSubmitAdmission,
    formState: { errors: errorsAdmission, isSubmitting: isSubmittingAdmission },
    setValue: setAdmissionValue,
    watch,
  } = useForm();

  const selectedDegreeCourse = watch("degreeCourse");
  const selectedSecondLanguage = watch("secondLanguage");
  const selectedCaste = watch("caste");
  const selectedReligion = watch("religion");

  const {
    register: registerDeclaration,
    handleSubmit: handleSubmitDeclaration,
    formState: {
      errors: errorsDeclaration,
      isSubmitting: isSubmittingDeclaration,
    },
  } = useForm();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSectionSubmit = (data, nextTab) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
    if (nextTab) {
      handleTabChange(nextTab);
    } else {
      onSubmit({ ...formData, ...data });
    }
  };

  return (
    <>
      <div className="my-10">
        <div className="my-10">
          <Tabs value={activeTab} className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-4 overflow-auto">
              <TabsTrigger
                value="personal_info"
                onClick={() => handleTabChange("personal_info")}
              >
                Personal Info
              </TabsTrigger>
              <TabsTrigger
                value="academic_info"
                onClick={() => handleTabChange("academic_info")}
              >
                Academic Info
              </TabsTrigger>
              <TabsTrigger
                value="admission_info"
                onClick={() => handleTabChange("admission_info")}
              >
                Admission Info
              </TabsTrigger>
              <TabsTrigger
                value="declaration"
                onClick={() => handleTabChange("declaration")}
              >
                Declaration
              </TabsTrigger>
            </TabsList>

            {/* Personal Info Tab */}
            <TabsContent value="personal_info">
              <form
                onSubmit={handleSubmitPersonal((data) =>
                  handleSectionSubmit(data, "academic_info")
                )}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Please provide your basic personal details to help us
                      create your student profile. This information will be used
                      for communication and official records.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Full Name</Label>
                          <Input
                            id="name"
                            type="text"
                            {...registerPersonal("name", {
                              required: {
                                value: true,
                                message: "Full name is required.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Full name must be at least 3 characters long.",
                              },
                              pattern: {
                                value: /^[A-Za-z\s-]+$/i,
                                message:
                                  "Full name can only contain letters, spaces, and hyphens.",
                              },
                            })}
                            placeholder="Enter Full Name"
                          />
                          {errorsPersonal.name && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.name.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Username</Label>
                          <Input
                            id="userName"
                            type="text"
                            {...registerPersonal("username", {
                              required: {
                                value: true,
                                message: "Username is required.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Username must be at least 3 characters long.",
                              },
                              maxLength: {
                                value: 20,
                                message:
                                  "Username cannot exceed 20 characters.",
                              },
                              pattern: {
                                value: /^[A-Za-z0-9_-]+$/, // Allows letters, numbers, underscores, and hyphens
                                message:
                                  "Username can only contain letters, numbers, underscores, and hyphens.",
                              },
                            })}
                            placeholder="User Name"
                          />
                          {errorsPersonal.username && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.username.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label htmlFor="date-of-birth">Date of Birth</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Date of Birth</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                  setDate(selectedDate);
                                  // Format the selected date as dd/MM/yyyy
                                  const formattedDate = selectedDate
                                    ? format(selectedDate, "dd/MM/yyyy")
                                    : "";
                                  setValue("dateOfBirth", formattedDate); // Register date with React Hook Form
                                }}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          {/* Hidden input to register the date in React Hook Form */}
                          <input
                            type="hidden"
                            {...registerPersonal("dateOfBirth", {
                              required: "Date of Birth is required",
                            })}
                          />
                          {errorsPersonal.dateOfBirth && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.dateOfBirth.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Nationality</Label>
                          <Input
                            id="nationality" // Added ID for accessibility
                            type="text" // Specify the input type for accessibility
                            {...registerPersonal("nationality", {
                              required: {
                                value: true,
                                message: "Nationality is required.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Nationality must be at least 3 characters long.",
                              },
                              maxLength: {
                                value: 30, // Optional: Set a maximum length for nationality
                                message:
                                  "Nationality cannot exceed 30 characters.",
                              },
                              pattern: {
                                value: /^[A-Za-z\s-]+$/, // Allows letters, spaces, and hyphens
                                message:
                                  "Nationality can only contain letters, spaces, and hyphens.",
                              },
                            })}
                            placeholder="Enter Nationality"
                          />
                          {errorsPersonal.nationality && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.nationality.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Email ID</Label>
                          <Input
                            id="emailID" // Added ID for accessibility
                            type="email" // Specify the input type for email validation
                            {...registerPersonal("email", {
                              required: {
                                value: true,
                                message: "Email ID is required.",
                              },
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Valid email pattern
                                message: "Please enter a valid email address.",
                              },
                            })}
                            placeholder="ex: example@gmail.org"
                          />
                          {errorsPersonal.email && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.email.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <div className="space-y-3">
                          <Label>Gender</Label>
                          <RadioGroup
                            defaultValue="Male"
                            className="flex space-x-5 items-center"
                            {...registerPersonal("gender")}
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Male" id="Male" />
                              <Label htmlFor="Male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="Female" id="Female" />
                              <Label htmlFor="Female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem
                                value="notPrefered"
                                id="notPrefered"
                              />
                              <Label htmlFor="notPrefered">
                                Prefer Not To say
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Phone Number</Label>
                          <Input
                            id="std_ph_no_1" // Added ID for accessibility
                            type="tel" // Specify the input type for telephone number
                            {...registerPersonal("primaryPhone", {
                              required: {
                                value: true,
                                message: "Phone number is required.",
                              },
                              pattern: {
                                value: /^\+?[0-9]{1,3}[-\s]?[0-9]{10}$/, // Regex for international phone numbers
                                message: "Please enter a valid phone number.",
                              },
                            })}
                            placeholder="+91 - "
                          />
                          {errorsPersonal.primaryPhone && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.primaryPhone.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Phone Number 2</Label>
                          <Input
                            id="std_ph_no_2" // Added ID for accessibility
                            type="tel" // Specify the input type for telephone number
                            {...registerPersonal("secondaryPhone", {
                              required: {
                                value: true,
                                message: "Phone number is required.",
                              },
                              pattern: {
                                value: /^\+?[0-9]{1,3}[-\s]?[0-9]{10}$/, // Regex for international phone numbers
                                message: "Please enter a valid phone number.",
                              },
                            })}
                            placeholder="+91 - "
                          />
                          {errorsPersonal.secondaryPhone && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.secondaryPhone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-1">
                        <Label>Address</Label>
                        <Textarea
                          id="address" // Added ID for accessibility
                          placeholder="Type your address here."
                          {...registerPersonal("address", {
                            required: {
                              value: true,
                              message: "Address is required.",
                            },
                            maxLength: {
                              value: 200, // Optional: Set a maximum length for the address
                              message: "Address cannot exceed 200 characters.",
                            },
                          })}
                        />
                        {errorsPersonal.address && (
                          <p className="text-red-700" style={{ color: "red" }}>
                            {errorsPersonal.address.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Parent/Guardian Name</Label>
                          <Input
                            id="parentFullName" // Added ID for accessibility
                            type="text" // Specify the input type for accessibility
                            {...registerPersonal("guardianName", {
                              required: {
                                value: true,
                                message: "Parent/Guardian Name is required.",
                              },
                              minLength: {
                                value: 3,
                                message:
                                  "Parent/Guardian Name must be at least 3 characters long.",
                              },
                              pattern: {
                                value: /^[A-Za-z\s-]+$/, // Allows letters, spaces, and hyphens
                                message:
                                  "Parent/Guardian Name can only contain letters, spaces, and hyphens.",
                              },
                            })}
                            placeholder="Enter Full Name"
                          />
                          {errorsPersonal.guardianName && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.guardianName.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <div className="space-y-1">
                          <Label>Parent/Guardian Contact Number</Label>
                          <Input
                            id="parent_ph_no" // Added ID for accessibility
                            type="tel" // Specify the input type for telephone number
                            {...registerPersonal("guardianPhone", {
                              required: {
                                value: true,
                                message:
                                  "Parent/Guardian Contact Number is required.",
                              },
                              pattern: {
                                value: /^\+?[0-9]{1,3}[-\s]?[0-9]{10}$/, // Regex for international phone numbers
                                message: "Please enter a valid contact number.",
                              },
                            })}
                            placeholder="+91 - "
                          />
                          {errorsPersonal.guardianPhone && (
                            <p
                              className="text-red-700"
                              style={{ color: "red" }}
                            >
                              {errorsPersonal.guardianPhone.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save and Continue</Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* Academic Info Tab */}
            <TabsContent value="academic_info">
              <form
                onSubmit={handleSubmitAcademic((data) =>
                  handleSectionSubmit(data, "admission_info")
                )}
              >
                {/* Academic Info Form Fields */}
                <Card>
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                    <CardDescription>
                      Please provide details about your previous education,
                      including your SSC and Intermediate qualifications.
                      Include the names of the schools, the boards/universities,
                      years of passing, and grades/marks obtained. This
                      information is essential for evaluating your eligibility
                      for the course you are applying for.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-1xl underline">SSC Details</Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>School Name</Label>
                            <Input
                              placeholder="Name"
                              {...registerAcademic("sscSchool", {
                                required: "School name is required.",
                                minLength: {
                                  value: 3,
                                  message:
                                    "School name must be at least 3 characters long.",
                                },
                                pattern: {
                                  value: /^[A-Za-z\s]+$/, // Allows letters and spaces
                                  message:
                                    "School name can only contain letters and spaces.",
                                },
                              })}
                            />
                            {errorsAcademic.sscSchool && (
                              <p className="text-red-700">
                                {errorsAcademic.sscSchool.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>Year of Passing</Label>
                            <Input
                              placeholder="Year"
                              type="number" // Specify type as number for numeric input
                              {...registerAcademic("sscYearOfPassing", {
                                required: "Year of Passing is required.",
                                min: {
                                  value: 1900,
                                  message: "Year must be at least 1900.",
                                },
                                max: {
                                  value: new Date().getFullYear(), // Current year
                                  message: `Year cannot exceed ${new Date().getFullYear()}.`,
                                },
                                pattern: {
                                  value: /^\d{4}$/, // Allows only four-digit numbers
                                  message: "Please enter a valid year.",
                                },
                                setValueAs: (value) => String(value), // Convert the number to a string
                              })}
                            />
                            {errorsAcademic.sscYearOfPassing && (
                              <p className="text-red-700">
                                {errorsAcademic.sscYearOfPassing.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>Grade/Marks Obtained</Label>
                            <Input
                              placeholder="Marks"
                              type="text" // Use text for more flexibility in input
                              {...registerAcademic("sscMarks", {
                                required: "Marks or Percentage is required.",
                                min: {
                                  value: 0,
                                  message: "Marks must be at least 0.",
                                },
                                max: {
                                  value: 1000,
                                  message: "Marks cannot exceed 1000.",
                                },
                                pattern: {
                                  value: /^(1000|[1-9]?[0-9]|[1-9]\d)$/, // Allows numbers from 0 to 100
                                  message:
                                    "Please enter a valid number (0-1000).",
                                },
                              })}
                            />
                            {errorsAcademic.sscMarks && (
                              <p className="text-red-700">
                                {errorsAcademic.sscMarks.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-5">
                      <Label className="text-1xl underline">
                        Intermediate Details
                      </Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>College Name</Label>
                            <Input
                              placeholder="Name"
                              {...registerAcademic("intermediateCollege", {
                                required: "College name is required.",
                                minLength: {
                                  value: 3,
                                  message:
                                    "College name must be at least 3 characters long.",
                                },
                                pattern: {
                                  value: /^[A-Za-z\s]+$/, // Allows letters and spaces
                                  message:
                                    "College name can only contain letters and spaces.",
                                },
                              })}
                            />
                            {errorsAcademic.intermediateCollege && (
                              <p className="text-red-700">
                                {errorsAcademic.intermediateCollege.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>Year of Passing</Label>
                            <Input
                              placeholder="Year"
                              type="number" // Specify type as number for numeric input
                              {...registerAcademic(
                                "intermediateYearOfPassing",
                                {
                                  required: "Year of Passing is required.",
                                  min: {
                                    value: 1900,
                                    message: "Year must be at least 1900.",
                                  },
                                  max: {
                                    value: new Date().getFullYear(), // Current year
                                    message: `Year cannot exceed ${new Date().getFullYear()}.`,
                                  },
                                  pattern: {
                                    value: /^\d{4}$/, // Allows only four-digit numbers
                                    message: "Please enter a valid year.",
                                  },
                                  setValueAs: (value) => String(value), // Convert the number to a string
                                }
                              )}
                            />
                            {errorsAcademic.intermediateYearOfPassing && (
                              <p className="text-red-700">
                                {
                                  errorsAcademic.intermediateYearOfPassing
                                    .message
                                }
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label>Grade/Marks Obtained</Label>
                            <Input
                              placeholder="Marks or Percentage"
                              type="text" // Using text for flexibility
                              {...registerAcademic("intermediateMarks", {
                                required: "Marks or Percentage is required.",
                                min: {
                                  value: 0,
                                  message: "Marks must be at least 0.",
                                },
                                max: {
                                  value: 1000,
                                  message: "Marks cannot exceed 1000.",
                                },
                                pattern: {
                                  value: /^(1000|[1-9]?[0-9]|[1-9]\d)$/, // Allows numbers from 0 to 100
                                  message:
                                    "Please enter a valid number (0-1000).",
                                },
                              })}
                            />
                            {errorsAcademic.intermediateMarks && (
                              <p className="text-red-700">
                                {errorsAcademic.intermediateMarks.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save and Continue</Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* Contact Info Tab */}
            <TabsContent value="admission_info">
              <form
                onSubmit={handleSubmitAdmission((data) =>
                  handleSectionSubmit(data, "declaration")
                )}
              >
                {/* Admission Info Form Fields */}

                <Card>
                  <CardHeader>
                    <CardTitle>Admission Information</CardTitle>
                    <CardDescription>
                      Please provide relevant information regarding your
                      admission, including your admission category, caste
                      details, religion, and any disabilities. This information
                      is important for processing your application and ensuring
                      that any necessary accommodations are made.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-1xl underline">
                        Degree Course Specifications
                      </Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="degreeCourse">Degree Course</Label>
                            <Select
                              value={selectedDegreeCourse}
                              onValueChange={(value) => {
                                setAdmissionValue("degreeCourse", value); // Set the selected value
                              }}
                            >
                              <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Select Course" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    Degree Course Specifications
                                  </SelectLabel>
                                  <SelectItem value="BCA">
                                    BCA [Bachelors in Computer Applications]
                                  </SelectItem>
                                  <SelectItem value="BBA">
                                    BBA [Bachelors in Business Administration]
                                  </SelectItem>
                                  <SelectItem value="BCOM">
                                    BCOM [Bachelors in Commerce]
                                  </SelectItem>
                                  <SelectItem value="BSC">
                                    BSC [Bachelors in Science]
                                  </SelectItem>
                                  <SelectItem value="BZC">
                                    BZC [Bachelors in Zoology and Chemistry]
                                  </SelectItem>
                                  <SelectItem value="Bio-Tech">
                                    Bio-Tech [Bachelors in Biotechnology]
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            {/* Show validation error */}
                            {errorsAdmission.degreeCourse && (
                              <p className="text-red-700">
                                {errorsAdmission.degreeCourse.message ||
                                  "This field is required"}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="secondLanguage">
                              Second Language
                            </Label>
                            <Select
                              value={selectedSecondLanguage}
                              onValueChange={(value) => {
                                setAdmissionValue("secondLanguage", value); // Set the selected value
                              }}
                            >
                              <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Select 2nd Language" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>
                                    2nd Language Preferences
                                  </SelectLabel>
                                  <SelectItem value="HINDI">
                                    HINDI [Hindi Language]
                                  </SelectItem>
                                  <SelectItem value="SANSKRIT">
                                    SANSKRIT [Sanskrit Language]
                                  </SelectItem>
                                  <SelectItem value="URDU">
                                    URDU [Urdu Language]
                                  </SelectItem>
                                  <SelectItem value="TAMIL">
                                    TAMIL [Tamil Language]
                                  </SelectItem>
                                  <SelectItem value="TELUGU">
                                    TELUGU [Telugu Language]
                                  </SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>

                            {/* Show validation error */}
                            {errorsAdmission.secondLanguage && (
                              <p className="text-red-700">
                                {errorsAdmission.secondLanguage.message ||
                                  "This field is required"}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-5">
                      <Label className="text-1xl underline">
                        Caste and Religion
                      </Label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="caste">Caste</Label>
                            <Select
                              value={selectedCaste}
                              onValueChange={(value) =>
                                setAdmissionValue("caste", value)
                              }
                            >
                              <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Select Caste" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="General">
                                    General
                                  </SelectItem>
                                  <SelectItem value="OBC">
                                    OBC (Other Backward Class)
                                  </SelectItem>
                                  <SelectItem value="SC">
                                    SC (Scheduled Caste)
                                  </SelectItem>
                                  <SelectItem value="ST">
                                    ST (Scheduled Tribe)
                                  </SelectItem>
                                  <SelectItem value="VJ">
                                    VJ (Vimukta Jati)
                                  </SelectItem>
                                  <SelectItem value="NT">
                                    NT (Nomadic Tribes)
                                  </SelectItem>
                                  <SelectItem value="SBC">
                                    SBC (Special Backward Class)
                                  </SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="religion">Religion</Label>
                            <Select
                              value={selectedReligion}
                              onValueChange={(value) =>
                                setAdmissionValue("religion", value)
                              }
                            >
                              <SelectTrigger className="w-[300px]">
                                <SelectValue placeholder="Select Religion" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectItem value="Hindu">Hindu</SelectItem>
                                  <SelectItem value="Muslim">Muslim</SelectItem>
                                  <SelectItem value="Christian">
                                    Christian
                                  </SelectItem>
                                  <SelectItem value="Sikh">Sikh</SelectItem>
                                  <SelectItem value="Buddhist">
                                    Buddhist
                                  </SelectItem>
                                  <SelectItem value="Jain">Jain</SelectItem>
                                  <SelectItem value="Zoroastrian">
                                    Zoroastrian
                                  </SelectItem>
                                  <SelectItem value="Other">Other</SelectItem>
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            {errorsAdmission.religion && (
                              <p className="text-red-700">
                                Religion is required.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="py-5">
                      <Label className="text-1xl underline">
                        Aadhar Card Details
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="aadharNumber">
                              Student's Aadhar Number
                            </Label>
                            <Input
                              id="aadharNumber"
                              placeholder="Enter Here"
                              {...registerAdmission("studentAadhaar", {
                                required: "Aadhar Number is required.",
                                pattern: {
                                  value: /^\d{12}$/, // Allows only 12-digit numbers
                                  message:
                                    "Aadhar Number must be a 12-digit number.",
                                },
                              })}
                            />
                            {errorsAdmission.studentAadhaar && (
                              <p className="text-red-700">
                                {errorsAdmission.studentAadhaar.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <Label htmlFor="motherAadharNumber">
                              Mother's Aadhar Number
                            </Label>
                            <Input
                              id="motherAadharNumber"
                              placeholder="Enter Here"
                              {...registerAdmission("motherAadhaar", {
                                required: "Mother's Aadhar Number is required.",
                                pattern: {
                                  value: /^\d{12}$/, // Allows only 12-digit numbers
                                  message:
                                    "Aadhar Number must be a 12-digit number.",
                                },
                              })}
                            />
                            {errorsAdmission.motherAadhaar && (
                              <p className="text-red-700">
                                {errorsAdmission.motherAadhaar.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Save and Continue</Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>

            {/* Declaration Tab */}
            <TabsContent value="declaration">
              <form
                onSubmit={handleSubmitDeclaration((data) =>
                  handleSectionSubmit(data, null)
                )}
              >
                {/* Declaration Form Fields */}
                <Card>
                  <CardHeader>
                    <CardTitle>Declaration and Consent</CardTitle>
                    <CardDescription>
                      In this section, you are required to confirm that all the
                      information provided in the application form is true and
                      accurate to the best of your knowledge. You must also
                      agree to the institution's terms and conditions. Please
                      provide your signature (or digital signature) to confirm
                      your consent and finalize the submission of your
                      application.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-2">
                    <div className="py-5">
                      <Label className="text-1xl underline">
                        Declaration Statement
                      </Label>
                      <div className="grid grid-cols-1 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                {...registerDeclaration("declare", {
                                  required:
                                    "You must agree the Declaration Statement before submitting",
                                })}
                              />{" "}
                              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                I hereby declare that all the information
                                provided in this application is true and
                                accurate to the best of my knowledge.
                              </label>
                            </div>
                            {errorsDeclaration.declare && (
                              <p className="text-red-700">
                                {errorsDeclaration.declare.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-1xl underline">
                        Terms and Conditions
                      </Label>
                      <div className="grid grid-cols-1 gap-4 py-5">
                        <div className="grid gap-2">
                          <div className="space-y-1">
                            <div className="flex items-center space-x-2">
                              <input
                                type="checkbox"
                                {...registerDeclaration("agreement", {
                                  required:
                                    "You must agree the Terms & Conditions before submitting",
                                })}
                              />
                              <label
                                htmlFor="terms"
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                I have read and understood the terms and
                                conditions of the institution.
                              </label>
                            </div>
                            {errorsDeclaration.agreement && (
                              <p className="text-red-700">
                                {errorsDeclaration.agreement.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit">Submit</Button>
                  </CardFooter>
                </Card>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default RegistrationForm;
