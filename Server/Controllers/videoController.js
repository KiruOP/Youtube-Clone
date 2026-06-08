import * as videoService from "../Services/videoService.js";
import mongoose from "mongoose";

export const uploadVideo = async (req, res) => {
    if (req.file === undefined) {
        return res.status(404).json({ message: "Please upload an mp4 video file only" });
    }
    try {
        const file = await videoService.createVideo({
            videotitle: req.body.title,
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            videochanel: req.body.chanel,
            uploader: req.body.uploader,
        });
        res.status(200).send("File uploaded successfully");
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getAllVideos = async (req, res) => {
    try {
        const videos = await videoService.getAllVideos();
        res.status(200).send(videos);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const viewsController = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Video unavailable..");
    }
    try {
        const updatedVideo = await videoService.incrementVideoViews(_id);
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const likeVideoController = async (req, res) => {
    const { id: _id } = req.params;
    const { Like } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("Video unavailable..");
    }
    try {
        const updatedVideo = await videoService.updateVideoLikes(_id, Like);
        res.status(200).json(updatedVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
