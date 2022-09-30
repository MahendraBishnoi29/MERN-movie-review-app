import client from "./client";
import { getToken } from "../utils/helper";

export const addReview = async (movieId, reviewData) => {
  const token = getToken();
  try {
    const { data } = await client.post(`/review/add/${movieId}`, reviewData, {
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    console.log("Error in Add Review Method" + error.message);
  }
};
