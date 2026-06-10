import comment from "../Models/comment.js";

export const createComment = async (commentData) => {
    const postComment = new comment(commentData);
    return await postComment.save();
};

export const getAllComments = async () => {
    return await comment.find();
};

export const deleteComment = async (id) => {
    return await comment.findByIdAndDelete(id);
};

export const updateComment = async (id, commentbody) => {
    return await comment.findByIdAndUpdate(
        id,
        { $set: { "commentbody": commentbody } },
        { new: true }
    );
};
