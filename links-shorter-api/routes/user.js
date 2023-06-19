import express from 'express';
import User from '../models/User.js'
import dotenv from "dotenv";

dotenv.config()

const baseUrl = process.env.BASE_URL;

const router = express.Router();

/**
 * @route  POST api/user
 * @desc   Creates new user by sessionId
 * @access Public
 */
router.post('/', async (req, res) => {
        const {sessionId} = req.body;
        try {
            let user = await User.findOne({sessionId});

            if (!user) {
                user = new User({sessionId});
                await user.save();
            }

            return res.status(200).json({sessionId: user.sessionId});
        } catch (err) {
            console.error(`Error occurred while recognizing user by session for ${sessionId}: ${err}`);
            return res.status(500).json({error: 'An error occurred'});
        }
    }
);


export default router;