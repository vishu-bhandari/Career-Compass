import React from "react";
import { Link } from "react-router-dom";
import { Label , TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <>
      <div className=" min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center ">
          <div className="left ">
            <Link
              to="/"
              className="   text   font-bold dark:text-white  text-4xl  "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                Career
              </span>
              Compass
            </Link>
            <p className="text-sm mt-5 ">Navigate your path to success with Career Compass – your go-to blog for career advice, insights, and inspiration.</p>
          </div>
          <div className="right ">
            <form action="">
              <div className="">
                <Label value="Your username"></Label>
                
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
