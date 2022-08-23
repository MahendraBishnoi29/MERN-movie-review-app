import client from "../client";

// UPLOAD TRAILER
export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = localStorage.getItem("auth-token");

  try {
    const { data } = await client.post("/movie/upload-trailer", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
      },
      onUploadProgress: ({ loaded, total }) => {
        if (onUploadProgress)
          onUploadProgress(Math.floor((loaded / total) * 100));
      },
    });
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};
