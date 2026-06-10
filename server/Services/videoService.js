import videofile from "../Models/videofile.js";

export const createVideo = async (videoData) => {
    const file = new videofile(videoData);
    return await file.save();
};

export const getAllVideos = async () => {
    return await videofile.find();
};

export const incrementVideoViews = async (id) => {
    const files = await videofile.findById(id);
    if (!files) throw new Error("Video not found");
    const currentViews = files.views;
    return await videofile.findByIdAndUpdate(id, {
        $set: { views: currentViews + 1 }
    }, { new: true });
};

export const updateVideoLikes = async (id, likeCount) => {
    return await videofile.findByIdAndUpdate(
        id,
        {
            $set: { "Like": likeCount }
        },
        { new: true }
    );
};
