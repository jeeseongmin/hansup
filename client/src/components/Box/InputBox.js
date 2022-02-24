import React from "react";

const InputBox = ({
  value,
  type,
  placeholder,
  onChange,
  refName,
  title,
  label,
}) => {
  return (
    <input
      ref={refName}
      title={title}
      id={label ? label : ""}
      type={type === "count" ? "number" : "text"}
      value={value}
      onChange={(e) => onChange(e, type)}
      class='w-full h-full px-4 border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200'
      placeholder={placeholder}
      disabled={placeholder === "도로명 주소" ? true : false}
    />
  );
};

export default InputBox;
