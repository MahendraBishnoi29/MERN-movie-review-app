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
