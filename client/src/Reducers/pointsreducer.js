// reducers/userReducer.js
import { UPDATE_POINTS } from '../action/pointsAction.js';

const initialState = {
  points: 0,
  videosWatched: 0
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_POINTS":
      return {
        ...state,
        points: action.payload.points,
        videosWatched: action.payload.videosWatched
      };
    default:
      return state;
  }
};

export default userReducer;
