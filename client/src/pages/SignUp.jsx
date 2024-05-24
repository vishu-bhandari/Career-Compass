import React from "react";
import { Link } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";

export default function SignUp() {
  return (
    <>
      <div className=" min-h-screen mt-20">
        <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row  md:items-center gap-5 ">
          <div className="left flex-1">
            <Link
              to="/"
              className="   text   font-bold dark:text-white  text-4xl  "
            >
              <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white ">
                Career
              </span>
              Compass
            </Link>
            <p className="text-sm mt-5 ">
              Navigate your path to success with Career Compass – your go-to
              blog for career advice, insights, and inspiration.
            </p>
          </div>
          <div className="right flex-1 ">
            <form action="" className="flex flex-col gap-4">
              <div className="">
                <Label value="Your username"></Label>
                <TextInput
                  type="text"
                  placeholder="Username"
                  id="username"
                ></TextInput>
              </div>
              <div className="">
                <Label value="Your email"></Label>
                <TextInput
                  type="text"
                  placeholder="name@company.com"
                  id="email"
                ></TextInput>
              </div>
              <div className="">
                <Label value="Your password"></Label>
                <TextInput
                  type="text"
                  placeholder="Password"
                  id="password"
                ></TextInput>
              </div>
              <Button gradientDuoTone='purpleToPink' type="submit"  >
                Sign Up
              </Button>
            </form>
            <div className="flex gap-2 text-sm mt-5 ">
              <span>Have An Account?</span>
              <Link to='/sign-in' className="text-blue-500 underline" >Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
