import React from "react";

const TextareaBox = ({ value, type, placeholder, onChange }) => {
	return (
		<textarea
			type="text"
			value={value}
			onChange={(e) => onChange(e, type)}
			class="w-full h-full px-4 py-4 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
			placeholder={placeholder}
		/>
	);
};

export default TextareaBox;
