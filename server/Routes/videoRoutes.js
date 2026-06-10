import express from "express";
import { uploadVideo, getAllVideos, viewsController, likeVideoController } from "../Controllers/videoController.js";
import upload from "../Helper/filehelper.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/uploadvideo", auth, upload.single("file"), uploadVideo);
router.get("/getvideos", getAllVideos);
router.patch('/like/:id', auth, likeVideoController);
router.patch('/view/:id', viewsController);

export default router;
