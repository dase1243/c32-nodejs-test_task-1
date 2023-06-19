import express from 'express';
import Url from '../models/Url.js'
import User from "../models/User.js";
import dotenv from "dotenv";
import validUrl from "valid-url";
import e from "express";
import shortId from "shortid";
import cacheData from "../middleware/redis.js";
import {redisClient} from "../config/redis.js";

dotenv.config()

const baseUrl = process.env.BASE_URL;

const router = express.Router();

/**
 * @route  POST api/url/shorter
 * @desc   Creates new shorter URL after checking on existence conditions
 * @access Public
 */
router.post('/shorter', async (req, res, next) => {
        const {originUrl, subpart, sessionId} = req.body;

        const urlCode = subpart || shortId.generate();

        if (validUrl.isUri(originUrl)) {
            try {
                let url = await Url.findOne({originUrl, sessionId, urlCode: subpart})

                if (url) {
                    return res.status(200).json({message: 'You already have such shorter url'});
                }

                let urlSpecificSubpart = await Url.findOne({urlCode: subpart})

                if (urlSpecificSubpart) {
                    return res.status(400).json({error: 'Such subpart is already taken'});
                }

                const shortUrl = `${baseUrl}/${urlCode}`;

                url = new Url({
                    sessionId,
                    originUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });

                await url.save();

                redisClient.del(sessionId, (error, result) => {
                    if (error) {
                        console.error(`Error deleting redirects for ${sessionId}`);
                    } else if (result === 1) {
                        console.info(`Cached redirects are removed for ${sessionId}`);
                    } else {
                        console.info(`Cache entry not found for ${sessionId}`);
                    }
                });

                return res.json(url);
            } catch (err) {
                console.error(`Error occurred while generating shorter URL: ${err}`);
                return res.status(500).json('Server error');
            }
        } else {
            return res.status(401).json('Invalid origin url');
        }
    }
);

/**
 *
 * @route  POST api/url/getAll/:sessionId
 * @desc  Returns all shorter urls for sessionId
 * @access Public
 */
router.get('/getAll/:sessionId', cacheData, async (req, res) => {
        const {sessionId} = req.params;

        try {
            const user = await User.findOne({sessionId});

            if (!user) {
                return res.status(404).json({error: 'User not found'});
            }

            const urls = await Url.find({sessionId});

            await redisClient.set(sessionId, JSON.stringify(urls), {
                EX: 180,
                NX: false,
            });

            return res.status(200).json({urls});
        } catch (err) {
            console.error(`Error occurred while getting all urls for ${sessionId}: ${err}`);
            return res.status(500).json({error: 'An error occurred'});
        }
    }
);

export default router;