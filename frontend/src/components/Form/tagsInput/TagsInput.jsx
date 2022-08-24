import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const TagsInput = () => {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const handleChange = ({ target }) => {
    const { value } = target;
    if (value !== ",") setTag(value);
  };

  const handleKeyDown = ({ key }) => {
    if (key === "," || key === "Enter") {
      if (!tag) return;
      if (tags.includes(tag)) return setTag("");

      setTags([...tags, tag]);
      setTag("");
    }
  };

  return (
    <div>
      <div
        onKeyDown={handleKeyDown}
        className="border-2 bg-transparent dark:border-dark-subtle border-light-subtle px-2 h-10 rounded w-full dark:text-white flex items-center space-x-2"
      >
        {tags.map((t) => (
          <Tag key={t}> {t} </Tag>
        ))}
        <input
          value={tag}
          onChange={handleChange}
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
    <span className="dark:bg-white bg-primary dark:text-primary text-white flex items-center text-sm px-1">
      {children}
      <button onClick={onClick}>
        <AiOutlineClose size={12} />
      </button>
    </span>
  );
};

export default TagsInput;
