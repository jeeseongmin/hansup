export const SET_REFRESH_VOICE = "SET_REFRESH_VOICE";
export const SET_REFRESH_ORDER = "SET_REFRESH_ORDER";

export const setRefreshVoice = (refresh_voice) => ({
	type: SET_REFRESH_VOICE,
	payload: refresh_voice,
});

export const setRefreshOrder = (refresh_order) => ({
	type: SET_REFRESH_ORDER,
	payload: refresh_order,
});

const initialState = {
	refresh_voice: null,
	refresh_order: null,
};

const common = (state = initialState, action) => {
	switch (action.type) {
		case SET_REFRESH_VOICE: {
			return {
				...state,
				refresh_voice: action.payload,
			};
		}

		case SET_REFRESH_ORDER: {
			return {
				...state,
				refresh_order: action.payload,
			};
		}

		default:
			return state;
	}
};

export default common;
