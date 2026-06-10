import mongoose from "mongoose";

const userPointsSchema = new mongoose.Schema({
    UserId: {
        type: String,
        required: true,
        unique: true,
    },
    points: {
        type: Number,
        default: 0,
    },
    videosWatched: {
        type: Number,
        default: 0,
    },
});

export default mongoose.model("UserPoints", userPointsSchema);