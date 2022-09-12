import React from "react";
import { useState } from "react";
import { searchActor } from "../../api/actor";
import { useSearch } from "../../hooks";
import { renderItem } from "../../utils/helper";
import Label from "../Label/Label";
import LiveSearch from "../LiveSearch/LiveSearch";

const DirectorSelector = ({ onSelect }) => {
  const [value, setValue] = useState("");
  const [profiles, setProfiles] = useState([]);

  const { handleSearch, resetSearch } = useSearch();

  const handleChange = ({ target }) => {
    const { value } = target;
    setValue(value);
    handleSearch(searchActor, value, setProfiles);
  };

  const handleOnSelect = (profile) => {
    setValue(profile.name);
    onSelect(profile);
    setProfiles([]);
    resetSearch();
  };

  return (
    <div>
      <Label htmlFor="director">Director</Label>
      <LiveSearch
        name="director"
        placeholder="Search profile"
        value={value}
        results={profiles}
        renderItem={renderItem}
        onSelect={handleOnSelect}
        onChange={handleChange}
      />
    </div>
  );
};

export default DirectorSelector;
