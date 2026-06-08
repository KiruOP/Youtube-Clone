import * as userService from "../Services/userService.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email } = req.body;
    try {
        const existingUser = await userService.findUserByEmail(email);
        if (!existingUser) {
            try {
                const newUser = await userService.createUser(email);
                const token = jwt.sign(
                    { email: newUser.email, id: newUser._id },
                    process.env.JWT_SECERT,
                    { expiresIn: "1h" }
                );

                // Create rewards profile
                await userService.createUserPointsProfile(newUser._id);
                res.status(200).json({ result: newUser, token });
            } catch (error) {
                res.status(500).json({ message: "Something went wrong..." });
            }
        } else {
            const token = jwt.sign(
                { email: existingUser.email, id: existingUser._id },
                process.env.JWT_SECERT,
                { expiresIn: "1h" }
            );
            res.status(200).json({ result: existingUser, token });
        }
    } catch (error) {
        res.status(500).json({ message: "Something went wrong..." });
    }
};

export const updateChannelData = async (req, res) => {
    const { id: _id } = req.params;
    const { name, desc } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).send("Channel unavailable..");
    }
    try {
        const updatedData = await userService.updateChannelData(_id, name, desc);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
};

export const getAllChannels = async (req, res) => {
    try {
        const channels = await userService.getAllChannels();
        res.status(200).json(channels);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
};
