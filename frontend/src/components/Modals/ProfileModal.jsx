import React, { useState } from "react";
import ModalContainer from "./ModalContainer";

const ProfileModal = ({ visible, profileId, onClose }) => {
  const [profile, setProfile] = useState({});
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <div className="p-5 rounded bg-white dark:bg-primary"></div>
    </ModalContainer>
  );
};

export default ProfileModal;
