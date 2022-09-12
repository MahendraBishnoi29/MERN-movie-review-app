import React, { useEffect } from "react";
import { forwardRef } from "react";
import { useRef } from "react";
import { useState } from "react";
import { commonInputClasses } from "../../utils/theme";

const LiveSearch = ({
  value = "",
  placeholder = "",
  results = [],
  name,
  selectedResultStyle,
  containerStyle,
  inputStyle,
  renderItem = null,
  onChange = null,
  onSelect = null,
}) => {
  const [displaySearch, setDisplaySearch] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const handleOnFocus = () => {
    if (results.length) setDisplaySearch(true);
  };

  const closeSearch = () => {
    setDisplaySearch(false);
    setFocusedIndex(-1);
  };

  const handleOnBlur = () => {
    setTimeout(() => {
      closeSearch();
    }, 100);
  };

  const handleSelection = (selectedItem) => {
    if (selectedItem) {
      onSelect(selectedItem);
      closeSearch();
    }
  };

  const handleKeyDown = ({ key }) => {
    let nextCount;

    const keys = ["ArrowDown", "ArrowUp", "Enter", "Escape"];
    if (!keys.includes(key)) return;

    if (key === "ArrowDown") {
      nextCount = (focusedIndex + 1) % results.length;
    }

    if (key === "ArrowUp") {
      nextCount = (focusedIndex + results.length - 1) % results.length;
    }

    if (key === "Escape") return closeSearch();

    if (key === "Enter") return handleSelection(results[focusedIndex]);
    setFocusedIndex(nextCount);
  };

  const getInputStyle = () => {
    return inputStyle
      ? inputStyle
      : commonInputClasses + " rounded border-2 p-1 text-lg";
  };

  useEffect(() => {
    if (results.length) return setDisplaySearch(true);
    setDisplaySearch(false);
  }, [results.length]);

  return (
    <div className="relative">
      <input
        onBlur={handleOnBlur}
        onFocus={handleOnFocus}
        onKeyDown={handleKeyDown}
        value={value}
        id={name}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        type="text"
        className={getInputStyle()}
      />
      <SearchResults
        focusedIndex={focusedIndex}
        visible={displaySearch}
        results={results}
        onSelect={handleSelection}
        renderItem={renderItem}
        containerStyle={containerStyle}
        selectedResultStyle={selectedResultStyle}
      />
    </div>
  );
};

// SEARCH RESULT COMPONENT
const SearchResults = ({
  visible,
  results = [],
  focusedIndex,
  onSelect,
  renderItem,
  containerStyle,
  selectedResultStyle,
}) => {
  const resultContainer = useRef();

  useEffect(() => {
    resultContainer.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [focusedIndex]);

  if (!visible) return null;

  return (
    <div className="absolute z-50 right-0 left-0 top-10 bg-white dark:bg-secondary shadow-md p-2 max-h-64 space-y-2 mt-1 overflow-auto custom-scrollbar">
      {results.map((result, index) => {
        const getSelectedClass = () => {
          return selectedResultStyle
            ? selectedResultStyle
            : "dark:bg-dark-subtle bg-light-subtle";
        };

        return (
          <ActorResults
            ref={index === focusedIndex ? resultContainer : null}
            key={index.toString()}
            item={result}
            renderItem={renderItem}
            containerStyle={containerStyle}
            selectedResultStyle={
              index === focusedIndex ? getSelectedClass() : ""
            }
            onClick={() => onSelect(result)}
          />
        );
      })}
    </div>
  );
};

// RESULT CARDS COMPONENT
const ActorResults = forwardRef((props, ref) => {
  const { item, renderItem, onClick, containerStyle, selectedResultStyle } =
    props;

  const getClasses = () => {
    if (containerStyle) return containerStyle + " " + selectedResultStyle;

    return (
      selectedResultStyle +
      " cursor-pointer rounded overflow-hidden dark:hover:bg-dark-subtle hover:bg-light-subtle transition"
    );
  };

  return (
    <div onClick={onClick} ref={ref} className={getClasses()}>
      {renderItem(item)}
    </div>
  );
});

export default LiveSearch;
