import React, { useState } from "react";
import { toast } from "react-toastify";
import { searchActor } from "../../api/actor";
import { useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch/LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastFrom = ({ onSubmit }) => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });
  const [profiles, setProfiles] = useState([]);

  const { leadActor, profile, roleAs } = castInfo;
  const { handleSearch, resetSearch } = useSearch();

  const handleProfileSelect = (profile) => {
    setCastInfo({ ...castInfo, profile });
  };

  const handleSubmit = () => {
    const { profile, roleAs } = castInfo;
    if (!profile.name) return toast.error("Cast Profile is missing!");
    if (!roleAs.trim()) return toast.error("Cast Role is missing!");
    onSubmit(castInfo);
    toast.success("Cast Added Successfully");
    setCastInfo({ ...defaultCastInfo, profile: { name: "" } });
    resetSearch();
    setProfiles([]);
  };

  const handleOnChange = ({ target }) => {
    const { checked, name, value } = target;
    if (name === "leadActor")
      return setCastInfo({ ...castInfo, leadActor: checked });

    setCastInfo({ ...castInfo, [name]: value });
  };

  const handleProfileChange = ({ target }) => {
    const { value } = target;
    const { profile } = castInfo;
    profile.name = value;
    setCastInfo({ ...castInfo, ...profile });
    handleSearch(searchActor, value, setProfiles);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="h-4 w-4"
        checked={leadActor}
        onChange={handleOnChange}
        title="Choose As Lead Actor"
      />
      <LiveSearch
        value={profile.name}
        results={profiles}
        onSelect={handleProfileSelect}
        renderItem={renderItem}
        placeholder="Search profile"
        onChange={handleProfileChange}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>

      <div className="flex-grow">
        <input
          value={roleAs}
          onChange={handleOnChange}
          name="roleAs"
          type="text"
          className={commonInputClasses + " rounded p-1 text-lg border-2"}
          placeholder="role As"
        />
      </div>

      <button
        onClick={handleSubmit}
        type="button"
        className="bg-secondary dark:bg-white text-white dark:text-primary px-1 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default CastFrom;
