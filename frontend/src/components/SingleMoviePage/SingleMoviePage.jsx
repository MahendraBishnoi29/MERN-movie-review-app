/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleMovie } from "../../api/movie/movie";
import { useAuth } from "../../hooks";
import AddRatingModal from "../Modals/AddRatingModal";
import Container from "../Navbar/Container";
import CustomButtonLink from "../Shared/CustomButtonLink";
import RatingStar from "../Shared/RatingStar";
import RelatedMovies from "../User/RelatedMovies";

const convertDate = (date = "") => {
  return date.split("T")[0];
};

const SingleMoviePage = () => {
  const [movie, setMovie] = useState({});
  const [ready, setReady] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;
  const { movieId } = useParams();
  const navigate = useNavigate();

  const fetchMovie = async () => {
    const { error, movie } = await getSingleMovie(movieId);
    if (error) return toast.error(error);
    setReady(true);
    setMovie(movie);
  };

  const handleOnRateMovie = () => {
    if (!isLoggedIn) {
      toast.info("Please SignIn/SignUp First!");
      navigate("/signIn");
    }
    setShowRatingModal(true);
  };

  const handleOnRatingSuccess = (reviews) => {
    setMovie({ ...movie, reviews });
  };

  useEffect(() => {
    if (movieId) fetchMovie();
  }, [movieId]);

  if (!ready)
    return (
      <div className="h-screen flex justify-center items-center bg-white dark:bg-primary">
        <p className="text-4xl text-light-subtle dark:text-dark-subtle animate-pulse">
          Loading Your Movie....
        </p>
      </div>
    );

  const {
    trailer,
    poster,
    storyLine,
    director = {},
    writers = [],
    cast = [],
    genres = [],
    title,
    type,
    releaseDate,
    language,
    id,
    reviews = {},
  } = movie;

  return (
    <div className="bg-white dark:bg-primary min-h-screen pb-10">
      <Container>
        <video poster={poster} src={trailer} controls></video>
        <div className="flex justify-between">
          <h1 className="text-4xl text-highlight dark:text-highlight-dark font-semibold py-3">
            {title}
          </h1>
          <div className="flex flex-col items-end">
            <RatingStar rating={reviews.ratingAvg} />

            <CustomButtonLink
              onClick={() => navigate(`/movie/reviews/${id}`)}
              label={reviews.reviewsCount + " Reviews"}
            />

            <CustomButtonLink
              onClick={handleOnRateMovie}
              label="Rate This Movie"
            />
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-light-subtle dark:text-dark-subtle">{storyLine}</p>

          <ListWithLabel label="Director:">
            <CustomButtonLink label={director.name} />
          </ListWithLabel>

          <ListWithLabel label="Writers:">
            {writers.map((w) => (
              <CustomButtonLink label={w.name} key={w.id} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Cast:">
            {cast.map(({ profile, id, leadActor }) => {
              return leadActor ? (
                <CustomButtonLink key={id} label={profile.name} />
              ) : null;
            })}
          </ListWithLabel>

          <ListWithLabel label="Language:">
            <CustomButtonLink label={language} clickable={false} />
          </ListWithLabel>

          <ListWithLabel label="Release Date:">
            <CustomButtonLink
              label={convertDate(releaseDate)}
              clickable={false}
            />
          </ListWithLabel>

          <ListWithLabel label="Genres:">
            {genres.map((g) => (
              <CustomButtonLink label={g} key={g} clickable={false} />
            ))}
          </ListWithLabel>

          <ListWithLabel label="Type:">
            <CustomButtonLink label={type} clickable={false} />
          </ListWithLabel>

          <CastProfiles cast={cast} />
          <RelatedMovies movieId={movieId} />
        </div>
      </Container>

      <AddRatingModal
        onSuccess={handleOnRatingSuccess}
        visible={showRatingModal}
        onClose={() => setShowRatingModal(false)}
      />
    </div>
  );
};

const ListWithLabel = ({ label, children }) => {
  return (
    <div className="flex space-x-2">
      <p className="text-light-subtle dark:text-dark-subtle font-semibold">
        {label}
      </p>
      {children}
    </div>
  );
};

// CAST
const CastProfiles = ({ cast }) => {
  return (
    <div>
      <h1 className="text-light-subtle dark:text-dark-subtle font-semibold text-2xl mb-2">
        Cast:
      </h1>
      <div className="flex flex-wrap space-x-3">
        {cast.map(({ profile, id, roleAs }) => {
          return (
            <div
              key={id}
              className="basis-28 flex flex-col items-center text-center mb-3"
            >
              <img
                src={profile.avatar}
                alt=""
                loading="lazy"
                className="w-24 h-24 aspect-square object-contain rounded-full"
              />

              <p className="text-highlight dark:text-highlight-dark hover:underline cursor-pointer">
                {profile.name}
              </p>
              <span className="text-light-subtle dark:text-dark-subtle text-sm">
                as
              </span>
              <p className="text-light-subtle dark:text-dark-subtle">
                {roleAs}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SingleMoviePage;
