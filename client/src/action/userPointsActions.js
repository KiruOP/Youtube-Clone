import { updateUserPoints, fetchUserProfile } from "../Api";

// Action Creators
export const updatePoints = (userId, pointsToAdd, videosWatchedToAdd) => async dispatch => {
    dispatch({ type: "UPDATE_USER_POINTS_REQUEST" });

    try {
        updateUserPoints(userId, pointsToAdd, videosWatchedToAdd);
        dispatch({ type: "UPDATE_USER_POINTS_SUCCESS" });
    } catch (error) {
        dispatch({ type: "UPDATE_USER_POINTS_FAILURE", payload: error.message });
    }
};

export const getUserProfile = (userId) => async dispatch => {
    dispatch({ type: "FETCH_USER_PROFILE_REQUEST" });

    try {
        const response = fetchUserProfile(userId);
        dispatch({ type: "FETCH_USER_PROFILE_SUCCESS", payload: response.data });
    } catch (error) {
        dispatch({ type: "FETCH_USER_PROFILE_FAILURE", payload: error.message });
    }
};
