import React from "react";

const InputBox = ({ value, type, placeholder, onChange }) => {
	return (
		<input
			type="text"
			value={value}
			onChange={(e) => onChange(e, type)}
			class="w-full h-full px-2 outline-none border-2 border-gray-200 focus:border-hansupBrown transition delay-100 duration-200 "
			placeholder={placeholder}
		/>
	);
};

export default InputBox;
