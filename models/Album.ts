import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Artist',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null
    }
});
const Album = mongoose.model('Album', AlbumSchema);
export default Album;