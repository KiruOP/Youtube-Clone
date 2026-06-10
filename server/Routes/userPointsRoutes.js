import express from "express";
import { updateUserPoints, getUserPoints } from "../Controllers/userPointsController.js";

const router = express.Router();

router.patch('/update/:id', updateUserPoints);
router.get('/getuserpoints', getUserPoints);

export default router;