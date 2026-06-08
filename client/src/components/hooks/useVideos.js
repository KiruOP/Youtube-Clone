import { useSelector, useDispatch } from 'react-redux';
import { getallvideo, uploadvideo, likevideo, viewvideo } from '../../actions/video';

const useVideos = () => {
    const dispatch = useDispatch();
    const videos = useSelector((state) => state.videoreducer)?.data || [];

    const fetchVideos = () => {
        dispatch(getallvideo());
    };

    const uploadVideoFile = (filedata, fileoption) => {
        dispatch(uploadvideo({ filedata, fileoption }));
    };

    const toggleLikeVideo = (id, likeCount) => {
        dispatch(likevideo({ id, Like: likeCount }));
    };

    const incrementViews = (id) => {
        dispatch(viewvideo({ id }));
    };

    return {
        videos,
        fetchVideos,
        uploadVideoFile,
        toggleLikeVideo,
        incrementViews,
    };
};

export default useVideos;
