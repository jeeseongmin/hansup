import React from "react";

const TextareaBox = ({ value, type, placeholder, onChange, title, label }) => {
  return (
    <textarea
      type="text"
      value={value}
      title={title}
      id={label ? label : null}
      onChange={(e) => onChange(e, type)}
      class="w-full h-full px-4 py-4 border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 resize-none "
      placeholder={placeholder}
    />
  );
};

export default TextareaBox;
