import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret,
    });
}

/**
 * Uploads a local file to Cloudinary and deletes it locally afterwards.
 * @param {string} localFilePath Path to the local file.
 * @returns {Promise<string>} The secure URL of the uploaded video.
 */
export const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!cloudName || !apiKey || !apiSecret) {
            throw new Error("Cloudinary credentials are not configured in environment variables (.env). Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.");
        }

        const result = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "video",
            folder: "k-tube-uploads",
        });

        // Delete the temporary file locally
        if (fs.existsSync(localFilePath)) {
            await fs.promises.unlink(localFilePath);
        }

        return result.secure_url;
    } catch (error) {
        // Attempt clean up of local file on upload error
        if (fs.existsSync(localFilePath)) {
            try {
                await fs.promises.unlink(localFilePath);
            } catch (cleanupError) {
                console.error("Cleanup of local file failed:", cleanupError);
            }
        }
        throw error;
    }
};
