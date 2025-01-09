import express from "express";
import TrackHistory from "../models/TrackHistory";
import User from "../models/User";
import Track from "../models/Track";

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
    const token = req.headers.authorization;
    const { track } = req.body;

    if (!token) {
       res.status(401).send({ error: "Unauthorized: Token is required." });
       return;
    }
    if (!track) {
        res.status(400).send({ error: "Track ID is required." });
        return;
    }

    try {
        const user = await User.findOne({ token });

        if (!user) {
           res.status(401).send({ error: "Unauthorized: Invalid token." });
           return;
        }

        const trackExists = await Track.findById(track);
        if (!trackExists) {
            res.status(404).send({ error: "Track not found." });
            return;
        }

        const trackHistory = new TrackHistory({
            user: user._id,
            track: trackExists._id,
            date: req.body.date,
        });

        await trackHistory.save();

        res.status(201).send({
            message: "Track history added successfully.",
            trackHistory,
        });

    } catch (error) {
        next(error);
    }
});

export default trackHistoryRouter;