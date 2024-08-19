import UserPoints from "../Models/UserPoints.js";
import mongoose from "mongoose";

// Function to update points and videos watched for the current logged-in user
export const updateUserPoints = async (req, res) => {
    const { id: _id } = req.params;
    const { points, videosWatched } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("UserPoints unavailable..")
    }

    try {
        const updatepoints = await UserPoints.findByIdAndUpdate(
            _id, {
            $set: {
                points: UserPoints.points + points,
                videosWatched: UserPoints.videosWatched + videosWatched,
            },
        },
            { new: true }
        );
        res.status(200).json(updatepoints)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getUserPoints = async (req, res) => {
    try {
        const userPointsdata = await UserPoints.find()
        res.status(200).send(userPointsdata)
    } catch (error) {
        res.status(400).json(error.message);
        return
    }
};
