import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    },
    duration: {
        type: String,
        default: null,
    },
});
const Track = mongoose.model('Track', TrackSchema);
export default Track;