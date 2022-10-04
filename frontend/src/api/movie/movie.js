import { getToken } from "../../utils/helper";
import client from "../client";

// UPLOAD TRAILER
export const uploadTrailer = async (formData, onUploadProgress) => {
  const token = getToken();

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

// UPLOAD MOVIE
export const uploadMovie = async (formData) => {
  const token = getToken();

  try {
    const { data } = await client.post("/movie/upload", formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
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

// GET MOVIE
export const getMovies = async (pageNo, limit) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `/movie/movies?pageNo=${pageNo}&limit=${limit}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// UPDATE TRAILER
export const getMovieForUpdate = async (id) => {
  const token = getToken();

  try {
    const { data } = await client("/movie/update/" + id, {
      headers: {
        Authorization: "Bearer " + token,
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

// UPDATE MOVIE
export const updateMovie = async (id, formData) => {
  const token = getToken();

  try {
    const { data } = await client.patch("/movie/update-movie/" + id, formData, {
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "multipart/form-data",
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

// DELETE MOVIE
export const deleteMovie = async (id) => {
  const token = getToken();

  try {
    const { data } = await client.delete(`/movie/delete-movie/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
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

// SEARCH MOVIE
export const searchMovieForAdmin = async (title) => {
  const token = getToken();

  try {
    const { data } = await client(`/movie/search?title=${title}`, {
      headers: {
        Authorization: "Bearer " + token,
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

// TOP-RATED MOVIE
export const getTopRatedMovies = async (type) => {
  try {
    let endpoint = "/movie/top-rated";
    if (type) endpoint = endpoint + "?type=" + type;

    const { data } = await client(endpoint);
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// GET LATEST UPLOADS
export const getLatestUploads = async () => {
  try {
    const { data } = await client("/movie/latest-uploads");
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// GET SINGLE MOVIE
export const getSingleMovie = async (id) => {
  try {
    const { data } = await client("/movie/single/" + id);
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// GET RELATED MOVIES
export const getRelatedMovies = async (id) => {
  try {
    const { data } = await client("/movie/related/" + id);
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};

// GET RELATED MOVIES
export const searchPublicMovies = async (title) => {
  try {
    const { data } = await client("/movie/public-search?title=" + title);
    return data;
  } catch (error) {
    console.log(error.message);
    const { res } = error;
    if (res?.data) return res.data;

    return error.message || error;
  }
};
