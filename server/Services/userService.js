import users from "../Models/Auth.js";
import UserPoints from "../Models/UserPoints.js";

export const findUserByEmail = async (email) => {
    return await users.findOne({ email });
};

export const createUser = async (email) => {
    return await users.create({ email });
};

export const updateChannelData = async (id, name, desc) => {
    return await users.findByIdAndUpdate(
        id,
        {
            $set: {
                name: name,
                desc: desc,
            },
        },
        { new: true }
    );
};

export const getAllChannels = async () => {
    const allChannels = await users.find();
    return allChannels.map((channel) => ({
        _id: channel._id,
        name: channel.name,
        email: channel.email,
        desc: channel.desc
    }));
};

export const createUserPointsProfile = async (userId) => {
    const userPoints = new UserPoints({ UserId: userId });
    return await userPoints.save();
};
