import express from 'express';
import { 
    updateUserPoints, 
    getCurrentUserProfile
} from '../Controllers/UserPoints.js';
import auth from "../middleware/auth.js"


const router = express.Router();

// Route to update points and videos watched for the current logged-in user
router.post('/update',auth, updateUserPoints);

// Route to get the current user's profile
router.get('/profile/:userId', getCurrentUserProfile);

export default router;