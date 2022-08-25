import React, { useState } from "react";
import { commonInputClasses } from "../../utils/theme";
import LiveSearch from "../LiveSearch/LiveSearch";

const defaultCastInfo = {
  profile: {},
  roleAs: "",
  leadActor: false,
};

const CastFrom = () => {
  const [castInfo, setCastInfo] = useState({ ...defaultCastInfo });

  const { leadActor } = castInfo;

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        name="leadActor"
        className="h-4 w-4"
        checked={leadActor}
      />
      <LiveSearch placeholder="Search profile" />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>

      <div className="flex-grow">
        <input
          type="text"
          className={commonInputClasses + " rounded p-1 text-lg border-2"}
          placeholder="role As"
        />
      </div>

      <button
        type="button"
        className="bg-secondary dark:bg-white text-white dark:text-primary px-1 rounded"
      >
        Add
      </button>
    </div>
  );
};

export default CastFrom;
