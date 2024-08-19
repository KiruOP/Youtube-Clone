import * as api from "../Api";

// Action Creators
export const updatePoints = (UserId, pointsdata) => async (dispatch) => {
    try {
        const { data } = await api.updatePoints(UserId, pointsdata);
        dispatch({ type: 'UPDATE_USER_POINTS', payload: data });
        dispatch(getUserPoints());
    } catch (error) {
        console.error('Error in updatePoints action:', error);
    }
};

export const getUserPoints = () => async (dispatch) => {
    try {
        const { data } = await api.getUserPoints();
        dispatch({ type: 'FETCH_USER_POINTS', payload: data });
    } catch (error) {
        console.error('Error in getUserPoints action:', error);
    }
};
