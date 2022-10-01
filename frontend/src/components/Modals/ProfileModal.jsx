/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getActorProfile } from "../../api/actor";
import ModalContainer from "./ModalContainer";

const ProfileModal = ({ visible, profileId, onClose }) => {
  const [profile, setProfile] = useState({});

  const fetchActorProfile = async () => {
    const { error, actor } = await getActorProfile(profileId);
    if (error) return toast.error("Error Fetching Actors Profile!");
    setProfile(actor);
  };

  useEffect(() => {
    if (profileId) fetchActorProfile();
  }, [profileId]);

  const { avatar, name, about } = profile;

  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="w-72 p-5 flex flex-col items-center rounded bg-white dark:bg-primary space-y-3">
        <img src={avatar} alt={name} className="w-28 h-28 rounded-full" />
        <h1 className="dark:text-white text-primary font-semibold">{name}</h1>
        <p className="dark:text-dark-subtle text-light-subtle">{about}</p>
      </div>
    </ModalContainer>
  );
};

export default ProfileModal;
