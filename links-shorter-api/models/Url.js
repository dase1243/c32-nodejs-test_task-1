import mongoose, {Schema} from "mongoose";

const urlSchema = new Schema({
    sessionId: String,
    urlCode: String,
    originUrl: String,
    shortUrl: String,
    createdAt: {type: String, default: Date.now},
    lastVisitedAt: {type: String, default: Date.now},
});

export const Url = mongoose.model('url', urlSchema);
export default Url;