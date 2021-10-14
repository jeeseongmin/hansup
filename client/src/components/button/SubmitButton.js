import React from "react";

const SubmitButton = ({ text, onSubmit }) => {
	return (
		<input
			type="submit"
			value={text}
			class="cursor-pointer w-full h-full flex justify-center items-center outline-none bg-hansupBrown text-white font-bold text-xl"
		/>
	);
};

export default SubmitButton;
