import express from "express";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const artistsRouter = express.Router();

artistsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const { name, info } = req.body;

    try {
        const newArtist = new Artist({
            name,
            info,
            image: req.file ? 'images' + req.file.filename : null,
        });

        await newArtist.save();
        res.send(newArtist);
    } catch (e) {
        next(e);
    }
});

artistsRouter.get('/', async (_req, res, next) => {
     try {
         const artists = await Artist.find();
         res.send(artists);
     } catch (e) {
         next(e);
     }
});

export default artistsRouter;