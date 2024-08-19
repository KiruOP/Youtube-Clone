// actions/userActions.js
export const UPDATE_POINTS = 'UPDATE_POINTS';

export const updatePoints = () => (dispatch, getState) => {
  const { points, videosWatched } = getState().user;
  const newPoints = points + 5;
  const newVideosWatched = videosWatched + 1;
  localStorage.setItem('userPoints', JSON.stringify({ points: newPoints, videosWatched: newVideosWatched }));
  dispatch({
    type: UPDATE_POINTS,
    payload: { points: newPoints, videosWatched: newVideosWatched }
  });
};
