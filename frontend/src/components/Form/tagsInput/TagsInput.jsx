import React, { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = ({ name, onChange, value }) => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const inputRef = useRef();
  const tagsInput = useRef();

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
    onChange(tags);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }
    // Remove tags by clicking Backspace
    if (key === "Backspace" && !tag && tags.length) {
      const newTags = tags.filter((_, index) => index !== tags.length - 1);
      setTags([...newTags]);
    }
  };

  const removeTag = (tagToRemove) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    setTags([...newTags]);
  };

  const handleOnBlur = () => {
    tagsInput.current.classList.add(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.remove("dark:border-white", "border-primary");
  };

  const handleOnFocus = () => {
    tagsInput.current.classList.remove(
      "dark:border-dark-subtle",
      "border-light-subtle"
    );
    tagsInput.current.classList.add("dark:border-white", "border-primary");
  };

  useEffect(() => {
    if (value.length) setTags(value);
  }, [value]);

  useEffect(() => {
    inputRef.current?.scrollIntoView(false);
  }, [tag]);

  return (
    <div>
      <div
        ref={tagsInput}
        onKeyDown={handleKeyDown}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full dark:text-white flex items-center space-x-2 overflow-x-auto custom-scrollbar transition mt-1"
      >
        {tags.map((t) => (
          <Tag onClick={() => removeTag(t)} key={t}>
            {t}
          </Tag>
        ))}
        <input
          ref={inputRef}
          value={tag}
          name="tag"
          onChange={handleChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          type="text"
          className="h-full flex-grow bg-transparent outline-none dark:text-white"
          placeholder="tag one, tag two"
        />
      </div>
    </div>
  );
};

const Tag = ({ children, onClick }) => {
  return (
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1 whitespace-nowrap">
      {children}
      <button type="button" onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};

export default TagsInput;
