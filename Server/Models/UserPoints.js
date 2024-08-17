import mongoose from "mongoose";

const userPointsSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    videosWatched: {
        type: Number,
        default: 0    
    },
});

export default mongoose.model('UserPoints', userPointsSchema);