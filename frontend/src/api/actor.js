import { getToken } from "../utils/helper";
import client from "./client";

// CREATE ACTOR
export const createActor = async (formData) => {
  const token = getToken();

  try {
    const { data } = await client.post("/actor/create", formData, {
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

// SEARCH ACTOR
export const searchActor = async (query) => {
  const token = getToken();

  try {
    const { data } = await client.get(`/actor/search?name=${query}`, {
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

// GET ACTORS FOR PAGINATION
export const getActors = async (pageNo, limit) => {
  const token = getToken();

  try {
    const { data } = await client.get(
      `/actor/actors?pageNo=${pageNo}&limit=${limit}`,
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

// UPDATE ACTOR
export const updateActor = async (id, formData) => {
  const token = getToken();

  try {
    const { data } = await client.post("/actor/update/" + id, formData, {
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

// GET ACTOR PROFILE
export const getActorProfile = async (id) => {
  try {
    const { data } = await client(`/actor/single/${id}`, {});
    return data;
  } catch (error) {
    console.log("Error in getActorProfile" + error.message);
  }
};

// Delete Actor
export const deleteActor = async (id) => {
  try {
    const { data } = await client.delete(`/actor/delete/${id}`);
    return data;
  } catch (error) {
    console.log("Error in DeleteActor method" + error.message);
  }
};
