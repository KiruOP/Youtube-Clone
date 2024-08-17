// Initial State
const initialState = {
user: null,
loading: false,
error: null,
};

// Reducer
const userPointsReducer = (state = initialState, action) => {
switch (action.type) {
    case "UPDATE_USER_POINTS_REQUEST":
    case "FETCH_USER_PROFILE_REQUEST":
        return { ...state, loading: true, error: null };
    
    case "UPDATE_USER_POINTS_SUCCESS":
        return { ...state, loading: false };
    
    case "FETCH_USER_PROFILE_SUCCESS":
        return { ...state, loading: false, user: action.payload };
    
    case "UPDATE_USER_POINTS_FAILURE":
    case "FETCH_USER_PROFILE_FAILURE":
        return { ...state, loading: false, error: action.payload };
    
    default:
        return state;
}
};

export default userPointsReducer;
