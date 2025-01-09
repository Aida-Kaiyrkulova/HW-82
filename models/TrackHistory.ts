import mongoose from "mongoose";

const Schema = mongoose.Schema;

const trackHistorySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: true
    },
    date: {
        type: String,
        default: () => new Date().toISOString()
    },
});

const TrackHistory = mongoose.model('TrackHistory', trackHistorySchema);
export default TrackHistory;