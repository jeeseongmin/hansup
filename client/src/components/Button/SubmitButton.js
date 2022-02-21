import React from "react";

const SubmitButton = ({ text, onSubmit }) => {
  return (
    <input
      type='submit'
      title='제출'
      value={text}
      class='cursor-pointer w-full h-full flex justify-center items-center bg-hansupBrown text-white font-bold text-xl'
    />
  );
};

export default SubmitButton;
