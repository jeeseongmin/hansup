import React from "react";

const RadioButton = ({ text, setSelected, current, clicked, title }) => {
  return (
    <button
      onClick={() => setSelected(clicked)}
      title={title}
      class='flex flex-row h-full cursor-pointer items-center'>
      <div class='h-6 w-6 rounded-full border border-hansupBrown mr-2 relative'>
        <div class='absolute w-full h-full flex justify-center items-center'>
          <div
            class={
              "h-4 w-4 rounded-full bg-hansupBrown transition delay-100 duration-200 " +
              (current === clicked ? "opacity-60 " : "opacity-0")
            }></div>
        </div>
      </div>
      <p class='text-lg'>{text}</p>
    </button>
  );
};

export default RadioButton;
