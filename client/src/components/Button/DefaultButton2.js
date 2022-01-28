import React from "react";

const DefaultButton = ({ text, event }) => {
  return (
    <button
      onClick={event}
      class='cursor-pointer w-full h-full flex justify-center transition delay-50 duration-150 items-center border border-hansupBrown bg-hansupBrown opacity-100 hover:opacity-60 text-white font-bold text-xl'>
      {text}
    </button>
  );
};

export default DefaultButton;
