import React from "react";
import Title from "./Title";
const Thanks = () => {
  return (
    <>
      <div className="my-10">
        <div className="text-center py-8 text-3xl border bg-gray-200">
          <Title text1={"APPLICATION"} text2={"Sent Successfully"} />
          <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-green-600  ">
            Please Check your Email ID For Further <br /> Communication
          </p>
        </div>
      </div>
    </>
  );
};

export default Thanks;
