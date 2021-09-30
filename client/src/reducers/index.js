import { combineReducers } from "redux";
import setting from "./setting";

export const USER_LOGOUT = "USER_LOGOUT";
export const settingLogOut = () => ({
	type: USER_LOGOUT,
});

const appReducer = combineReducers({
	setting,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
