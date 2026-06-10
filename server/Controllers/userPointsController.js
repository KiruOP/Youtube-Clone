import * as userPointsService from "../Services/userPointsService.js";
import mongoose from "mongoose";

export const updateUserPoints = async (req, res) => {
    const { id: _id } = req.params;
    const { points, videosWatched } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("UserPoints profile unavailable..");
    }

    try {
        const updatedPoints = await userPointsService.incrementUserPoints(_id, points, videosWatched);
        res.status(200).json(updatedPoints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserPoints = async (req, res) => {
    try {
        const pointsData = await userPointsService.getAllUserPoints();
        res.status(200).send(pointsData);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
