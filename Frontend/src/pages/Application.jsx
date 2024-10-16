import React, { useState } from "react";
import Title from "@/components/Title";
import RegistrationForm from "@/components/RegistrationForm";
import Thanks from "@/components/Thanks";
import emailjs from "emailjs-com"; // Import EmailJS

const Application = () => {
  const [formData, setFormData] = useState({});
  const [apiResponse, setApiResponse] = useState(null);

  const handleFormData = async (data) => {
    setFormData(data);
    console.log("Application Data Received By parent:");

    // Prepare the payload for the API request
    const payload = {
      name: data.name,
      email: data.email,
      nationality: data.nationality,
      gender: data.gender,
      address: data.address,
      dateOfBirth: data.dateOfBirth,
      username: data.username,
      primaryPhone: data.primaryPhone,
      secondaryPhone: data.secondaryPhone,
      guardianName: data.guardianName,
      guardianPhone: data.guardianPhone,
      sscSchool: data.sscSchool,
      sscYearOfPassing: data.sscYearOfPassing,
      sscMarks: data.sscMarks,
      intermediateCollege: data.intermediateCollege,
      intermediateYearOfPassing: data.intermediateYearOfPassing,
      intermediateMarks: data.intermediateMarks,
      degreeCourse: data.degreeCourse,
      secondLanguage: data.secondLanguage,
      caste: data.caste,
      religion: data.religion,
      studentAadhaar: data.studentAadhaar,
      motherAadhaar: data.motherAadhaar,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/applications/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json(); // Handle the JSON response
        setApiResponse(result); // Set the API response in state
        console.log("API Responded with the data");

        // Send email using EmailJS after successful form submission
        sendEmail(data.email, result.application_id, data.name); // Send to applicant's email
      } else {
        console.error("Failed to submit form data:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const sendEmail = (applicantEmail, applicationId, studentName) => {
    const templateParams = {
      to_name: studentName, // The student's name
      application_id: applicationId, // The application ID from your API response
      to_email: applicantEmail, // The applicant's email
    };

    emailjs
      .send(
        "service_mqciqq6", // Your Service ID
        "template_0nk7biu", // Your Template ID
        templateParams,
        "B4-hVDHKOiYrq9T-n" // Your User ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response.status);
        },
        (error) => {
          console.error("Failed to send email:", error);
        }
      );
  };

  return (
    <>
      <div className="my-10">
        <div className="text-center py-8 text-3xl">
          <Title text1={"APPLICATION"} text2={"FORM"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 ">
            Welcome to the Student Registration Portal. Please fill out this
            form to apply for admission to our institution. Ensure that all
            information provided is accurate and complete. The details collected
            will be used for your academic records and future communication.
            Thank you for choosing us for your educational journey!
          </p>
        </div>
      </div>
      {Object.keys(formData).length === 0 ? ( // Check if formData is empty
        <RegistrationForm onSubmit={handleFormData} />
      ) : (
        <Thanks /> // Render new component with formData
      )}
    </>
  );
};

export default Application;
