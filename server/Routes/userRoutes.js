import express from "express";
import { login, updateChannelData, getAllChannels } from "../Controllers/userController.js";

const router = express.Router();

router.post('/login', login);
router.patch('/update/:id', updateChannelData);
router.get('/getallchannel', getAllChannels);

export default router;
