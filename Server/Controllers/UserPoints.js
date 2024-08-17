import UserPoints from "../Models/UserPoints.js";

// Function to update points and videos watched for the current logged-in user
export const updateUserPoints = async (req, res) => {
    const { userId, pointsToAdd, videosWatchedToAdd } = req.body;

    try {
        // Find the user by their ID
        let user = await UserPoints.findOne({ userId });

        if (!user) {
            // If user doesn't exist, create a new user points record
            user = new UserPoints({
                userId,
                points: pointsToAdd,
                videosWatched: videosWatchedToAdd
            });
            console.log(user);
            console.log(userId);
        } else {
            // Update points and videos watched based on frontend data
            user.points += pointsToAdd;
            user.videosWatched += videosWatchedToAdd;
        }

        // Save the user object (either newly created or updated)
        await user.save();

        res.status(200).json('Points and videos watched updated successfully');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

// Function to get the current user's profile
export const getCurrentUserProfile = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by their ID
        const user = await UserPoints.findOne({ userId });

        // Check if the user exists
        if (!user) {
            return res.status(404).json('User not found');
        }

        // Send user profile data
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
