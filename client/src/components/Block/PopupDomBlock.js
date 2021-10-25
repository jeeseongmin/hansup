import ReactDom from "react-dom";

const PopupDomBlock = ({ children }) => {
	const el = document.getElementById("popupDom");
	return ReactDom.createPortal(children, el);
};

export default PopupDomBlock;
