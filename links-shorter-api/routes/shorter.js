import express from "express";
import Url from '../models/Url.js'

const router = express.Router();

/**
 * @route  GET api/{shorter_id}
 * @desc   Get origin link redirect
 * @access Public
 */
router.get('/:shorterId', async (req, res) => {
    try {
        const url = await Url.findOne({urlCode: req.params.shorterId});

        if (url) {
            Url.updateOne({ _id: url._id }, { lastVisitedAt: new Date() })
                .then((result) => {
                    console.info(`${result} document updated`);
                })
                .catch((error) => {
                    console.error(`Error updating Url document ${url._id}:`, error);
                });


            return res.redirect(url.originUrl);
        } else {
            return res.status(404).json('No url found');
        }
    } catch (err) {
        console.error(`Error occurred while redirecting by shorter URL: ${err}`);
        return res.status(500).json('Server error');
    }
})

export default router;