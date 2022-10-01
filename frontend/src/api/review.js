import client from "./client";
import { getToken } from "../utils/helper";

// ADD REVIEW
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

// GET REVIEW BY MOVIE
export const getReviewsByMovie = async (movieId) => {
  try {
    const { data } = await client(`/review/get-reviews-by-movie/${movieId}`);

    return data;
  } catch (error) {
    console.log("Error in Get Review for Movie" + error.message);
  }
};
