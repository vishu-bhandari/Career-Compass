import { Button, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imagefile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };
  console.log(imagefile, imageFileUrl);
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl ">Profile</h1>
      <form className="flex flex-col gap-4  ">
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full ">
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="user"
            className="rounded-full w-full h-full border-8 object-cover border-[lightgray] "
          />
        </div>
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        ></TextInput>
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        ></TextInput>
        <TextInput
          type="password"
          id="password"
          placeholder="Password"
        ></TextInput>
        <Button type="Submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="text-red-500 flex  justify-between mt-5 ">
        <span className=" cursor-pointer underline">Delete Account</span>
        <span className=" cursor-pointer underline">Sign Out</span>
      </div>
    </div>
  );
}
