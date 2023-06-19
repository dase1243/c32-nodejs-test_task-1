import {redisClient} from "../config/redis.js";

/**
 * Middleware for endpoints to cache response data in redis
 * Currently used only for /api/urls/getAll/:sessionId endpoint
 */
async function cacheData(req, res, next) {
    const {sessionId} = req.params;
    let results;
    try {
        const cacheResults = await redisClient.get(sessionId);
        if (cacheResults) {
            results = JSON.parse(cacheResults);
            res.send({
                fromCache: true,
                data: results,
            });
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        res.status(404);
    }
}

export default cacheData;