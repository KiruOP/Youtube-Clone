import express from "express";
import { 
    addHistory, getHistory, clearHistory, 
    addLikedVideo, getLikedVideos, removeLikedVideo, 
    addWatchLater, getWatchLater, removeWatchLater 
} from "../Controllers/playlistController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// History
router.post('/history', auth, addHistory);
router.get('/getallhistory', getHistory);
router.delete('/deletehistory/:userid', auth, clearHistory);

// Watch Later
router.post('/watchlater', auth, addWatchLater);
router.get('/getallwatchlater', getWatchLater);
router.delete('/deletewatchlater/:videoid/:viewer', auth, removeWatchLater);

// Liked Video
router.post('/likevideo', auth, addLikedVideo);
router.get('/getalllikevide', getLikedVideos);
router.delete('/deletelikevideo/:videoid/:viewer', auth, removeLikedVideo);

export default router;
