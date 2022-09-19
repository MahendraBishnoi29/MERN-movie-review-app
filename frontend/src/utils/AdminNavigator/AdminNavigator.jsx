import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Actors from "../../components/Admin/Actors/Actors";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import Dashboard from "../../components/Admin/Dashboard/Dashboard";
import Header from "../../components/Admin/Header";
import Movies from "../../components/Admin/Movie/Movies";
import SearchMovies from "../../components/Admin/Movie/SearchMovies";
import MovieUpload from "../../components/Admin/Upload/MovieUpload";
import NotFound from "../../components/Home/NotFound";
import ActorUpload from "../../components/Modals/ActorUpload";

const AdminNavigator = () => {
  const [showMovieUploadModal, setShowMovieUploadModal] = useState(false);
  const [showActorUploadModal, setShowActorUploadModal] = useState(false);

  // Movie Modal Upload State
  const hideMovieUploadModal = () => {
    setShowMovieUploadModal(false);
  };

  const displayMovieUploadModal = () => {
    setShowMovieUploadModal(true);
  };

  // Actor Modal Upload State
  const hideActorUploadModal = () => {
    setShowActorUploadModal(false);
  };

  const displayActorUploadModal = () => {
    setShowActorUploadModal(true);
  };

  return (
    <>
      <div className="flex dark:bg-primary bg-white">
        <AdminNavbar />
        <div className="flex-1 p-2 max-w-screen-xl">
          <Header
            onAddMovie={displayMovieUploadModal}
            onAddActor={displayActorUploadModal}
          />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/actors" element={<Actors />} />
            <Route path="/search" element={<SearchMovies />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </div>
      </div>

      <MovieUpload
        visible={showMovieUploadModal}
        onClose={hideMovieUploadModal}
      />
      <ActorUpload
        visible={showActorUploadModal}
        onClose={hideActorUploadModal}
      />
    </>
  );
};

export default AdminNavigator;
