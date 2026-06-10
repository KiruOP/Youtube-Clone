import history from "../Models/history.js";
import likedvideo from "../Models/likevideo.js";
import watchlater from "../Models/watchlater.js";

// History
export const addHistoryEntry = async (historyData) => {
    const entry = new history(historyData);
    return await entry.save();
};

export const getAllHistory = async () => {
    return await history.find();
};

export const clearUserHistory = async (userid) => {
    return await history.deleteMany({ viewer: userid });
};

// Liked Videos
export const addLikedVideoEntry = async (likedVideoData) => {
    const entry = new likedvideo(likedVideoData);
    return await entry.save();
};

export const getAllLikedVideos = async () => {
    return await likedvideo.find();
};

export const removeLikedVideo = async (videoid, viewer) => {
    return await likedvideo.findOneAndDelete({ videoid, viewer });
};

// Watch Later
export const addWatchLaterEntry = async (watchLaterData) => {
    const entry = new watchlater(watchLaterData);
    return await entry.save();
};

export const getAllWatchLater = async () => {
    return await watchlater.find();
};

export const removeWatchLater = async (videoid, viewer) => {
    return await watchlater.findOneAndDelete({ videoid, viewer });
};
