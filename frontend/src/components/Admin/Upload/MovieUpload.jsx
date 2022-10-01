/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast } from "react-toastify";
import { uploadMovie, uploadTrailer } from "../../../api/movie/movie";
import ModalContainer from "../../Modals/ModalContainer";
import MovieForm from "../Movie/MovieForm";

const MovieUpload = ({ visible, onClose }) => {
  const [videoSelected, setVideoSelected] = useState(false);
  const [videoUploaded, setVideoUploaded] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState({});
  const [busy, setBusy] = useState(false);

  const resetState = () => {
    setVideoSelected(false);
    setVideoUploaded(false);
    setUploadProgress(0);
    setVideoInfo({});
  };

  // Handle Upload Trailer
  const handleUploadTrailer = async (data) => {
    const { error, url, public_id } = await uploadTrailer(
      data,
      setUploadProgress
    );
    if (error) return toast.error(error);

    setVideoUploaded(true);

    toast.success("file uploaded successfully");
    setVideoInfo({ url, public_id });
  };

  // Handle Change
  const handleChange = (file) => {
    const formData = new FormData();
    formData.append("video", file);

    setVideoSelected(true);

    handleUploadTrailer(formData);
  };

  // Handle Type Error
  const handleTypeError = (error) => {
    toast.error(error);
  };

  // Upload Progress
  const getUploadProgress = () => {
    if (!videoUploaded && uploadProgress >= 100) {
      return "Processing...";
    }

    return `Upload progress ${uploadProgress}%`;
  };

  // Handle Submit
  const handleSubmit = async (data) => {
    if (!videoInfo.url || !videoInfo.public_id)
      return toast.error("Trailer is Missing!");

    setBusy(true);
    data.append("trailer", JSON.stringify(videoInfo));
    const res = uploadMovie(data);
    setBusy(false);
    resetState();
    onClose();
    toast.success("Movie Uploaded Successfully 🎉");
  };

  return (
    <ModalContainer visible={visible}>
      <div className="mb-5">
        <UploadProgress
          visible={!videoUploaded && videoSelected}
          message={getUploadProgress()}
          width={uploadProgress}
        />
      </div>

      {!videoSelected ? (
        <TrailerSelector
          visible={!videoSelected}
          onTypeError={handleTypeError}
          handleChange={handleChange}
        />
      ) : (
        <MovieForm
          btnTitle="Upload"
          busy={busy}
          onSubmit={!busy ? handleSubmit : null}
        />
      )}
    </ModalContainer>
  );
};

// TRAILER SELECT COMPONENT
const TrailerSelector = ({ visible, handleChange, onTypeError }) => {
  if (!visible) return null;

  return (
    <div className="flex items-center justify-center h-full">
      <FileUploader
        handleChange={handleChange}
        onTypeError={onTypeError}
        types={["mp4", "avi", "3gp", "mkv"]}
      >
        <div className="text-center cursor-pointer w-48 h-48 border border-dashed dark:border-dark-subtle border-light-subtle rounded-full flex flex-col items-center justify-center text-secondary dark:text-dark-subtle">
          <AiOutlineCloudUpload size={80} />
          <p>Select or Drag & Drop your file here</p>
        </div>
      </FileUploader>
    </div>
  );
};

// UPLOAD PROGRESS COMPONENT
const UploadProgress = ({ message, width, visible }) => {
  if (!visible) return null;
  return (
    <div className="dark:bg-secondary bg-white drop-shadow-lg rounded p-3">
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
