import * as playlistService from "../Services/playlistService.js";

// History
export const addHistory = async (req, res) => {
    try {
        await playlistService.addHistoryEntry(req.body);
        res.status(200).json("added to history");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getHistory = async (req, res) => {
    try {
        const historyList = await playlistService.getAllHistory();
        res.status(200).send(historyList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const clearHistory = async (req, res) => {
    const { userid } = req.params;
    try {
        await playlistService.clearUserHistory(userid);
        res.status(200).json({ message: "removed from history" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Liked Videos
export const addLikedVideo = async (req, res) => {
    try {
        await playlistService.addLikedVideoEntry(req.body);
        res.status(200).json("added to likedvideo");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getLikedVideos = async (req, res) => {
    try {
        const likedVideos = await playlistService.getAllLikedVideos();
        res.status(200).send(likedVideos);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeLikedVideo = async (req, res) => {
    const { videoid, viewer } = req.params;
    try {
        await playlistService.removeLikedVideo(videoid, viewer);
        res.status(200).json({ message: "removed from liked video" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Watch Later
export const addWatchLater = async (req, res) => {
    try {
        await playlistService.addWatchLaterEntry(req.body);
        res.status(200).json("added to watchlater");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getWatchLater = async (req, res) => {
    try {
        const watchLaterList = await playlistService.getAllWatchLater();
        res.status(200).send(watchLaterList);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const removeWatchLater = async (req, res) => {
    const { videoid, viewer } = req.params;
    try {
        await playlistService.removeWatchLater(videoid, viewer);
        res.status(200).json({ message: "removed from watch later" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
