import React from "react";
import { FileInput, Select, TextInput, Button } from "flowbite-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreatePost() {
  return (
    <>
      <div className="p-3 max-w-3xl mx-auto min-h-screen">
        <h1 className=" text-center text-3xl my-7 font-semibold">
          Create a Post
        </h1>
        <form action="" className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row justify-between">
            <TextInput
              type="text"
              placeholder="Title"
              required
              id="title"
              className="flex-1 "
            ></TextInput>
            <Select>
              <option value="uncatergorized">Select a category</option>
              <option value="javascript">Career Advice</option>
              <option value="reactjs">Industry Insights</option>
              <option value="nextjs">Application Process</option>
            </Select>
          </div>
          <div className="flex gap-4 items-center justify-between border-4 border-teal-400 border-dotted p-3">
            <FileInput type="file" accept="image/*"></FileInput>
            <Button
              type="button"
              gradientDuoTone="purpleToBlue"
              size="sm"
              outline
            >
              Upload Image
            </Button>
          </div>
          <ReactQuill
            theme="snow"
            placeholder="Write Something..."
            className="h-72 mb-12 "
            required
          />
          <Button className="" type="submit" gradientDuoTone="purpleToPink">
            Publish
          </Button>
        </form>
      </div>
    </>
  );
}
