import { useSelector, useDispatch } from 'react-redux';
import { addtohistory, getallhistory, clearhistory } from '../../actions/history';
import { addtowatchlater, getallwatchlater, deletewatchlater } from '../../actions/watchlater';
import { addtolikedvideo, getalllikedvideo, deletelikedvideo } from '../../actions/likedvideo';

const usePlaylists = () => {
    const dispatch = useDispatch();

    const history = useSelector((state) => state.historyreducer)?.data || [];
    const watchLater = useSelector((state) => state.watchlaterreducer)?.data || [];
    const likedVideos = useSelector((state) => state.likedvideoreducer)?.data || [];

    // History
    const fetchHistory = () => {
        dispatch(getallhistory());
    };
    const logHistory = (videoid, viewer) => {
        dispatch(addtohistory({ videoid, viewer }));
    };
    const clearHistoryLogs = (userid) => {
        dispatch(clearhistory({ userid }));
    };

    // Watch Later
    const fetchWatchLater = () => {
        dispatch(getallwatchlater());
    };
    const logWatchLater = (videoid, viewer) => {
        dispatch(addtowatchlater({ videoid, viewer }));
    };
    const clearWatchLater = (videoid, viewer) => {
        dispatch(deletewatchlater({ videoid, viewer }));
    };

    // Liked Videos
    const fetchLikedVideos = () => {
        dispatch(getalllikedvideo());
    };
    const logLikedVideo = (videoid, viewer) => {
        dispatch(addtolikedvideo({ videoid, viewer }));
    };
    const clearLikedVideo = (videoid, viewer) => {
        dispatch(deletelikedvideo({ videoid, viewer }));
    };

    return {
        history,
        watchLater,
        likedVideos,
        fetchHistory,
        logHistory,
        clearHistoryLogs,
        fetchWatchLater,
        logWatchLater,
        clearWatchLater,
        fetchLikedVideos,
        logLikedVideo,
        clearLikedVideo,
    };
};

export default usePlaylists;
