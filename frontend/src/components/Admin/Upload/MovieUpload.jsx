import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { uploadTrailer } from "../../../api/movie/movie";

const MovieUpload = () => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = async (file) => {
    const formData = new FormData();
    formData.append("video", file);

    const res = await uploadTrailer(formData, setUploadProgress);
    console.log(res);
    toast.success("file uploaded successfully");
  };

  const handleTypeError = (error) => {
    toast.error(error);
  };

  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[40rem] h-[34rem] overflow-auto">
        <UploadProgress
          visible
          message={`Upload progress ${uploadProgress}%`}
          width={uploadProgress}
        />
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi", "3gp"]}
      >
        <div className="cursor-pointer w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center text-secondary dark:text-dark-subtle">
          <AiOutlineCloudUpload size={80} />
          <p className="">Drop your file here</p>
        </div>
      </FileUploader>
    </div>
  );
};

// UPLOAD PROGRESS
const UploadProgress = ({ message, width, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white draopshadow-lg rounded p-3">
      <div className="relative h-3 dark:bg-dark-subtle bg-light-subtle overflow-hidden">
        <div
          style={{ width: width + "%" }}
          className="h-full w-14 absolute left-0 dark:bg-white bg-secondary"
        />
      </div>
      <p className="font-semibold dark:text-dark-subtle text-light-subtle animate-pulse mt-1">
        {message}
      </p>
    </div>
  );
};

export default MovieUpload;
