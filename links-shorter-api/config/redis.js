import dotenv from "dotenv";
import redis from "redis";

dotenv.config()

const redisHost = process.env.REDIS_HOST;
export let redisClient;

/**
 * Created redis client for internal usage
 * @returns redis client instance
 */
export const connectRedis = async () => {
    try {
        redisClient = redis.createClient({
            url: redisHost,
        });

        redisClient.on("error", (error) => {
            console.error(`Error : ${error}`)
            process.exit(1);
        });

        await redisClient.connect();

        console.info('Redis is started')
    } catch (err) {
        console.error(err.message);
        console.error(err);
        process.exit(1);
    }
}

export default {connectRedis, redisClient};
