import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { deleteActor, getActors, searchActor } from "../../../api/actor";
import { toast } from "react-toastify";
import NextPrevBtn from "./NextPrevBtn";
import UpdateActorModal from "../../Modals/UpdateActorModal";
import SearchInputForm from "../../Shared/SearchInputForm";
import { useSearch } from "../../../hooks";
import NotFoundText from "../../Shared/NotFoundText";
import ConfirmModal from "../../Modals/ConfirmModal";

let currentPageNo = 0;
const limit = 12;

const Actors = () => {
  const [actors, setActors] = useState([]);
  const [reachedToEnd, setReachedToEnd] = useState(false);
  const [busy, setBusy] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [results, setResults] = useState([]);

  const { handleSearch, resetSearch, resultNotFound } = useSearch();

  const fetchActors = async (pageNo) => {
    const { profiles, error } = await getActors(pageNo, limit);
    if (error)
      return toast.error("Something Went Wrong While Fetching Actors...");

    if (!profiles?.length) {
      currentPageNo = pageNo - 1;
      toast.error("No More Actors!");
      return setReachedToEnd(true);
    }

    setActors([...profiles]);
  };

  // Next Page
  const onNext = () => {
    if (reachedToEnd) return;
    currentPageNo += 1;
    fetchActors(currentPageNo);
  };

  // Previous Page
  const onPrev = () => {
    if (currentPageNo <= 0) return;
    if (reachedToEnd) setReachedToEnd(false);
    currentPageNo -= 1;
    fetchActors(currentPageNo);
  };

  // Edit Actor
  const handleEdit = (profile) => {
    setShowUpdateModal(true);
    setSelectedProfile(profile);
  };

  // Edit Actor Modal
  const hideUpdateModal = () => {
    setShowUpdateModal(false);
  };

  // Intantly Render Updated Actor On UI
  const handleOnUpdatedActor = (profile) => {
    const updatedActors = actors.map((actor) => {
      if (profile.id === actor.id) {
        return profile;
      }
      return actor;
    });
    setActors([...updatedActors]);
  };

  // Search Actor
  const handleSubmit = (value) => {
    handleSearch(searchActor, value, setResults);
  };

  // Reset Serach Results Page
  const handleSearchReset = () => {
    resetSearch();
    setResults([]);
  };

  // Delete Actor
  // const handleOnDelete = async () => {
  //   setBusy(true);
  //   const { error, message } = await deleteActor(selectedProfile?.id);
  //   console.log(selectedProfile?.id);
  //   setBusy(false);
  //   if (error) return toast.error("Failed Deleting Actor " + error);
  //   toast.success(message);
  //   fetchActors(currentPageNo);
  // };

  useEffect(() => {
    fetchActors(currentPageNo);
  }, []);

  return (
    <>
      <div className="p-5">
        <div className="flex justify-end">
          <SearchInputForm
            showResetIcon={results.length || resultNotFound}
            onReset={handleSearchReset}
            onSubmit={handleSubmit}
            placeholder="Search Actors..."
          />
        </div>

        <NotFoundText text="Record Not Found! 🤔" visible={resultNotFound} />

        <div className="grid grid-cols-4 gap-5 p-5">
          {results?.length || resultNotFound
            ? results.map((actor) => (
                <ActorProfile
                  key={actor.id}
                  profile={actor}
                  onEdit={() => handleEdit(actor)}
                  // onDelete={() => handleOnDelete(actor)}
                />
              ))
            : actors.map((actor) => (
                <ActorProfile
                  key={actor.id}
                  profile={actor}
                  onEdit={() => handleEdit(actor)}
                  // onDelete={() => handleOnDelete(actor)}
                />
              ))}
        </div>

        {!results.length && !resultNotFound ? (
          <NextPrevBtn onNext={onNext} onPrev={onPrev} />
        ) : null}
      </div>

      {/* <ConfirmModal
        onConfirm={handleOnDelete}
        visible={showConfirmModal}
        busy={busy}
        onCancel={() => setShowConfirmModal(false)}
      /> */}

      <UpdateActorModal
        OnUpdatedActor={handleOnUpdatedActor}
        initialState={selectedProfile}
        visible={showUpdateModal}
        onClose={hideUpdateModal}
      />
    </>
  );
};

// ActorProfile Component
const ActorProfile = ({ profile, onEdit, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);
  const acceptedNameLength = 15;

  // Get Name
  const getName = () => {
    if (name.length <= acceptedNameLength) return name;
    return name.substring(0, acceptedNameLength) + "..";
  };

  const onMouseEnter = () => {
    setShowOptions(true);
  };

  const onMouseLeave = () => {
    setShowOptions(false);
  };

  if (!profile) return null;

  const { name, avatar, about = "" } = profile;

  return (
    <div className="bg-white shadow-2xl dark:shadow-2xl dark:bg-secondary h-20 rounded overflow-hidden">
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="flex cursor-pointer relative"
      >
        <img
          src={avatar}
          alt={name}
          className="w-20 h-full aspect-square object-cover"
        />
        <div className="px-2">
          <h1 className="text-xl text-primary dark:text-white font-semibold">
            {getName(name)}
          </h1>
          <p className="text-primary dark:text-white opacity-70">
            {about.substring(0, 50)}
          </p>
        </div>

        <Options onEdit={onEdit} visible={showOptions} />
      </div>
    </div>
  );
};

// Options Component
const Options = ({ visible, onEdit }) => {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 bg-primary bg-opacity-25 backdrop-blur-sm space-x-2">
      <button
        className="p-2 rounded-full bg-white text-primary hover:opacity-80 m-2"
        type="button"
      >
        <BsTrash />
      </button>
      <button
        onClick={onEdit}
        className="p-2 rounded-full bg-white text-primary hover:opacity-80"
        type="button"
      >
        <BsPencilSquare />
      </button>
    </div>
  );
};
export default Actors;
