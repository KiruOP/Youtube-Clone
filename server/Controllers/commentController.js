import * as commentService from "../Services/commentService.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
    try {
        await commentService.createComment(req.body);
        res.status(200).json("posted the comment");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getComment = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).send(comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteComment = async (req, res) => {
    const { id: _id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comment unavailable..");
    }
    try {
        await commentService.deleteComment(_id);
        res.status(200).json({ message: "deleted comment" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const editComment = async (req, res) => {
    const { id: _id } = req.params;
    const { commentbody } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Comment unavailable..");
    }
    try {
        const updatedComment = await commentService.updateComment(_id, commentbody);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
