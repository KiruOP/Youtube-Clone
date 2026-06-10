import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { uploadToCloudinary } from "./Helper/cloudinaryHelper.js";
import User from "./Models/Auth.js";
import Video from "./Models/videofile.js";
import Comment from "./Models/comment.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl = process.env.DB_URL;
if (!dbUrl) {
    console.error("Error: DB_URL is missing in environment variables (.env).");
    process.exit(1);
}

const fakeCommentsList = [
    "Wow, this is an amazing video!",
    "I learned so much from this, thank you for uploading!",
    "Incredible production quality. Keep it up!",
    "Can you make a follow-up video on this topic?",
    "Loved the explanation, very clear and beginner-friendly.",
    "This is exactly what I was searching for!",
    "Super clean explanation, subscribed!",
    "Awesome content as always. Big fan!",
    "The audio quality is great, and the pace is perfect.",
    "Outstanding tutorial, thank you!"
];

const seed = async () => {
    try {
        console.log("Connecting to MongoDB database...");
        await mongoose.connect(dbUrl, { dbName: "K-Tube" });
        console.log(`Connected to database successfully`);

        // Create Demo Channel Creator
        let demoChannel = await User.findOne({ email: "demo@k-tube.com" });
        if (!demoChannel) {
            demoChannel = new User({
                email: "demo@k-tube.com",
                name: "K-Tube Demo Creator",
                desc: "Welcome to the official K-Tube demo channel! Sharing high-quality video content.",
            });
            await demoChannel.save();
            console.log("Created demo channel: K-Tube Demo Creator");
        } else {
            console.log("Using existing demo channel.");
        }

        // Create Fake Commenter Users
        const fakeUserNames = ["TechEnthusiast", "CodeExplorer", "LearnDaily", "PixarFan", "WebMaster99"];
        const fakeUsers = [];
        for (const username of fakeUserNames) {
            let user = await User.findOne({ email: `${username.toLowerCase()}@k-tube.com` });
            if (!user) {
                user = new User({
                    email: `${username.toLowerCase()}@k-tube.com`,
                    name: username,
                    desc: `${username}'s official profile. Just learning and commenting.`,
                });
                await user.save();
            }
            fakeUsers.push(user);
        }
        console.log(`Verified ${fakeUsers.length} dummy users for mock engagement.`);

        // Read video files from uploads folder
        const uploadsDir = path.join(__dirname, "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        const files = fs.readdirSync(uploadsDir);
        const mp4Files = files.filter(f => f.endsWith(".mp4"));

        if (mp4Files.length === 0) {
            console.log("\n=====================================================================");
            console.log("WARNING: No .mp4 files found in the 'server/uploads' directory!");
            console.log("Please copy some video files (.mp4) into 'server/uploads/' first,");
            console.log("and then run 'node seed.js' again to seed them.");
            console.log("=====================================================================\n");
            await mongoose.disconnect();
            return;
        }

        console.log(`Found ${mp4Files.length} video(s) to upload & seed.`);

        for (const filename of mp4Files) {
            const filePath = path.join(uploadsDir, filename);
            console.log(`Uploading ${filename} to Cloudinary... (This might take a moment)`);
            
            const cloudinaryUrl = await uploadToCloudinary(filePath);
            console.log(`Uploaded! Cloudinary URL: ${cloudinaryUrl}`);

            // Random views, likes, and comment counts
            const randomViews = Math.floor(Math.random() * 9500) + 500; // 500 to 10000 views
            const randomLikes = Math.floor(Math.random() * (randomViews / 3)) + 10; // Positive likes proportion
            const titleWithoutExt = path.parse(filename).name.replace(/[-_]/g, " ");

            // Save video to DB
            const video = new Video({
                videotitle: titleWithoutExt.charAt(0).toUpperCase() + titleWithoutExt.slice(1),
                filename: filename,
                filepath: cloudinaryUrl,
                filetype: "video/mp4",
                filesize: `${(fs.existsSync(filePath) ? fs.statSync(filePath).size : 1048576) / (1024 * 1024)} mb`, // Mock size if deleted
                videochanel: demoChannel._id.toString(),
                Like: randomLikes,
                views: randomViews,
                uploader: demoChannel.name,
            });
            await video.save();
            console.log(`Saved Video "${video.videotitle}" to Database.`);

            // Create fake comments for this video
            const commentCount = Math.floor(Math.random() * 4) + 2; // 2 to 5 comments
            for (let i = 0; i < commentCount; i++) {
                const randomUserIndex = Math.floor(Math.random() * fakeUsers.length);
                const commenter = fakeUsers[randomUserIndex];
                const randomCommentTextIndex = Math.floor(Math.random() * fakeCommentsList.length);
                const commentBody = fakeCommentsList[randomCommentTextIndex];

                const comment = new Comment({
                    videoid: video._id.toString(),
                    userid: commenter._id.toString(),
                    commentbody: commentBody,
                    usercommented: commenter.name,
                });
                await comment.save();
            }
            console.log(`Added ${commentCount} fake comments for video "${video.videotitle}".`);
        }

        console.log("\nSeeding completed successfully!");
        await mongoose.disconnect();
        console.log("Disconnected from Database safely.");
    } catch (error) {
        console.error("Seeding failed with error:", error);
        try {
            await mongoose.disconnect();
        } catch (_) {}
        process.exit(1);
    }
};

seed();
