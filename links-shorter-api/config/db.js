import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const dbUri = process.env.DB_URI;

/**
 * Created mongodb client for internal usage
 * @returns mongodb client instance
 */
const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
        });

        console.info('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
}

export default connectDB;
