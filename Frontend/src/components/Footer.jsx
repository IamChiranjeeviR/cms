import React from "react";
import { assets } from "@/assets/assets";
const Footer = () => {
  return (
    <>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 mt-40 text-sm bg-slate-900 text-white p-10">
        <div>
          <img src={assets.logo} className="w-36" alt="" />
          <p className="w-full md:w-2/3 text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sint
            laborum, recusandae similique incidunt alias perspiciatis
            repudiandae deserunt blanditiis nisi sequi, ab deleniti cum ullam
            labore beatae. Voluptatibus, repudiandae nemo?
          </p>
        </div>

        <div className="pt-10">
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>Home</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Login Here</li>
            <li>Application Form</li>
          </ul>
        </div>

        <div className="pt-10">
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-white">
            <li>08571-223199,222215</li>
            <li>gnanambicadegreecollege@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-900">
        <hr />
        <p className="py-5 text-base text-center text-white">
          Copyright 2024@ cms.com - All Rights Reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
