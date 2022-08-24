import React from "react";
import { commonInputClasses } from "../../utils/theme";

const LiveSearch = () => {
  return (
    <div>
      <input
        type="text"
        className={commonInputClasses + " rounded border-2 p-1 text-lg"}
      />
    </div>
  );
};

export default LiveSearch;
