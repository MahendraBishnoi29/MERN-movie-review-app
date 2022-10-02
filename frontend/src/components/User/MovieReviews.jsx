/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Container from "../Navbar/Container";
import CustomButtonLink from "../Shared/CustomButtonLink";
import RatingStar from "../Shared/RatingStar";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteReview, getReviewsByMovie } from "../../api/review";
import { useAuth } from "../../hooks";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import ConfirmModal from "../Modals/ConfirmModal";
import NotFoundText from "../Shared/NotFoundText";
import EditRatingModal from "../Modals/Review/EditRatingModal";

const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};

const MovieReviews = () => {
  const [movieReviews, setMovieReviews] = useState([]);
  const [profileOwners, setProfileOwners] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [movieTitle, setMovieTitle] = useState(" ");

  const { movieId } = useParams();
  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const fetchReviews = async () => {
    const { movie, error } = await getReviewsByMovie(movieId);
    if (error) return toast.error(error + "Error Fetching Reviews by Movie!");
    setMovieReviews([...movie.reviews]);
    setMovieTitle(movie.title);
  };

  const findProfileOwnerReview = () => {
    if (profileOwners) return setProfileOwners(null);
    const match = movieReviews.find((review) => review.owner.id === profileId);
    if (!match) return toast.error("You don't have any review!");
    setProfileOwners(match);
  };

  const displayConfirmModal = () => setShowConfirmModal(true);
  const hideEditModal = () => {
    setShowEditModal(false);
    setSelectedReview(null);
  };

  // Delete Review
  const handleDeleteReviews = async () => {
    setBusy(true);
    const { error, message } = await deleteReview(profileOwners.id);
    setBusy(false);
    if (error) return toast.error(error + " Error Deleting Review");
    toast.success(message);

    const updatedReviews = movieReviews.filter(
      (r) => r.id !== profileOwners.id
    );
    setMovieReviews([...updatedReviews]);
    setProfileOwners(null);
    setShowConfirmModal(false);
  };

  const handleOnEdit = () => {
    const { id, content, rating } = profileOwners;
    setSelectedReview({
      id,
      content,
      rating,
    });
    setShowEditModal(true);
  };

  // Update Reviews
  const handleReviewUpdate = (review) => {
    const updatedReview = {
      ...profileOwners,
      rating: review.rating,
      content: review.content,
    };
    setProfileOwners({ ...updatedReview });

    const newReviews = movieReviews.map((r) => {
      if (r.id === updatedReview.id) return updatedReview;
      return r;
    });

    setMovieReviews([...newReviews]);
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
            {movieTitle}
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwners ? "View All" : "Find My Review"}
              onClick={findProfileOwnerReview}
            />
          ) : null}
        </div>

        <NotFoundText text="No Reviews!" visible={!movieReviews.length} />

        {profileOwners ? (
          <div className="mt-3">
            <ReviewCard review={profileOwners} />
            <div className="flex space-x-3 dark:text-white text-primary text-xl p-3">
              <button onClick={displayConfirmModal} type="button">
                <BsTrash />
              </button>
              <button onClick={handleOnEdit} type="button">
                <BsPencilSquare />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-4">
            {movieReviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        )}
      </Container>

      <ConfirmModal
        busy={busy}
        visible={showConfirmModal}
        onConfirm={handleDeleteReviews}
        onCancel={() => setShowConfirmModal(false)}
      />

      <EditRatingModal
        visible={showEditModal}
        onSuccess={handleReviewUpdate}
        onClose={hideEditModal}
        initialState={selectedReview}
      />
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
