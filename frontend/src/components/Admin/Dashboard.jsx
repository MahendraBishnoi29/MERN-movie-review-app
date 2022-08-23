import React from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Dashboard = () => {
  const handleChange = () => {};

  return (
    <div className="fixed inset-0 dark:bg-white bg-primary dark:bg-opacity-50 bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="dark:bg-primary bg-white rounded w-[40rem] h-[34rem] overflow-auto">
        <div className="flex items-center justify-center h-full">
          <FileUploader>
            <div className="cursor-pointer w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center text-secondary dark:text-dark-subtle">
              <AiOutlineCloudUpload size={80} />
              <p className="">Drop your file here</p>
            </div>
          </FileUploader>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
