import { combineReducers } from "redux";
import setting from "reducers/setting";
import common from "reducers/common";

export const USER_LOGOUT = "USER_LOGOUT";
export const settingLogOut = () => ({
	type: USER_LOGOUT,
});

const appReducer = combineReducers({
	setting,
	common,
});

const rootReducer = (state, action) => {
	if (action.type === USER_LOGOUT) {
		state = undefined;
	}
	return appReducer(state, action);
};

export default rootReducer;
