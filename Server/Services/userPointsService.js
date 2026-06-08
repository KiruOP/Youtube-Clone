import UserPoints from "../Models/UserPoints.js";

export const incrementUserPoints = async (id, points, videosWatched) => {
    return await UserPoints.findByIdAndUpdate(
        id,
        {
            $inc: {
                points: points,
                videosWatched: videosWatched,
            },
        },
        { new: true }
    );
};

export const getAllUserPoints = async () => {
    return await UserPoints.find();
};
