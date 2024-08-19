import express from 'express';
import { 
    updateUserPoints, 
    getUserPoints
} from '../Controllers/UserPoints.js';
const router = express.Router();

// Route to fetch user points
router.get('/getuserpoints', getUserPoints);

// Route to update user points
router.patch('/update/:UserId', updateUserPoints);

export default router;