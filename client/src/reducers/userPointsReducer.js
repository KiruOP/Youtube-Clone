// Reducer
const userPointsReducer = (states = [], action) => {
    switch (action.type) {
        case 'FETCH_USER_POINTS':
            return action.payload;
        case 'UPDATE_USER_POINTS':
            return states.map((state) =>
                state._id === action.payload._id ? action.payload : state
            );
        default:
            return states;
    }
};

export default userPointsReducer;