/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getReviewsByMovie } from "../../api/review";
import { useAuth } from "../../hooks";
import Container from "../Navbar/Container";
import CustomButtonLink from "../Shared/CustomButtonLink";
import RatingStar from "../Shared/RatingStar";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [profileOwners, setProfileOwners] = useState(null);

  const { movieId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const fetchReviews = async () => {
    const { reviews, error } = await getReviewsByMovie(movieId);
    if (error) return toast.error(error + "Error Fetching Reviews by Movie!");
    setMovieReviews([...reviews]);
  };

  const findProfileOwnerReview = () => {
    if (profileOwners) return setProfileOwners(null);
    const match = movieReviews.find((review) => review.owner.id === profileId);
    if (!match) return toast.error("You don't have any review!");
    setProfileOwners(match);
  };

  useEffect(() => {
    if (movieId) fetchReviews();
  }, [movieId]);

  return (
    <div className="dark:bg-primary bg-white min-h-screen pb-10">
      <Container className="xl:px-0 px-2 p-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-secondary dark:text-white">
            <span className="text-light-subtle dark:text-dark-subtle font-normal">
              Reviews For:{" "}
            </span>
            This is Title
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwners ? "View All" : "Find My Review"}
              onClick={findProfileOwnerReview}
            />
          ) : null}
        </div>

        {profileOwners ? (
          <div className="mt-3">
            <ReviewCard review={profileOwners} />
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {movieReviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        )}
      </Container>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  if (!review) return null;

  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-light-subtle dark:bg-dark-subtle text-xl select-none">
        {getNameInitial(owner?.name)}
      </div>
      <div className="">
        <h1 className="dark:text-white text-secondary font-semibold text-lg">
          {owner.name}
        </h1>
        <RatingStar rating={rating} />
        <p className="text-light-subtle dark:text-dark-subtle">{content}</p>
      </div>
    </div>
  );
};

export default MovieReviews;
