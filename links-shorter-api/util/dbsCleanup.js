import {redisClient} from "../config/redis.js";
import Url from "../models/Url.js";
import cron from 'node-cron';


function cleanupRedis() {
    try {
        redisClient.flushAll((error, result) => {
            if (error) {
                console.log(`Error flushing redis`);
            } else if (result === 1) {
                console.log(`redis is flushed successfully`);
            }
        });
    } catch (err) {
        console.error(`Couldn't perform redis cleanup. Exception: ${err}`);
    }
}

function generateDeletionFilter() {
    const timestamp = new Date();
    timestamp.setFullYear(timestamp.getFullYear() - 5);

    return {
        lastVisitedAt: {
            $lte: timestamp,
        },
    };
}

function cleanupMongoDB() {
    let filter = generateDeletionFilter();

    try {

    Url.deleteMany(filter)
        .then((result) => {
            console.log(`Old documents are deleted from mongo db. Number of deleted documents: ${result.deletedCount}`);
        })
        .catch((error) => {
            console.error(`Error deleting documents: ${error}`);
        });
    } catch (err) {
        console.error(`Couldn't perform mongodb cleanup. Exception: ${err}`);
    }
}

/**
 * cron job setup for cleaning redis and mongodb from urls older than 5 years
 */
const startCleanupSchedule = () => {
    cron.schedule('0 0 * * *', () => {
        cleanupMongoDB();
        cleanupRedis();
    });
}

export default startCleanupSchedule;