import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
const tracksRouter = express.Router();

tracksRouter.post('/', async (req, res, next) => {
   const { album, title, duration } = req.body;

   try {
       const albumExists = await Album.findById(album);

       if (!albumExists) {
           res.status(400).send('Album not found');
           return;
       }

       const track = new Track({
           album,
           title,
           duration,
       });

       await track.save();
       res.send(track);
   } catch (e) {
       next(e);
   }

});

tracksRouter.get('/', async (req, res, next) => {
    try {
        const { album } = req.query;
        const filter = album ? { album } : {};
        const tracks = await Track.find(filter).populate('album');
        res.send(tracks);
    } catch (e) {
     next(e)
    }

});

export default tracksRouter;