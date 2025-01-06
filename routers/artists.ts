import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistsRouter = express.Router();

artistsRouter.get('/', async (_req, res, next) => {
     try {
         const artists = await Artist.find();
         res.send(artists);
     } catch (e) {
         next(e);
     }
});

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {

    const newArtist = {
      name: req.body.name,
        image: req.file ? 'images' + req.file.filename : null,
      info: req.body.info,
  };

    try {
        const newArtistData = new Artist(newArtist);
        await newArtistData.save();
        res.send(newArtistData);
    } catch (e) {
        next(e);
    }
});

export default artistsRouter;