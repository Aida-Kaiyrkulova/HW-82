import express from "express";
import Album from "../models/Album";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";

const albumsRouter = express.Router();

albumsRouter.post('/', imagesUpload.single('image'), async (req, res, next) => {
    const  {artist, title, year} = req.body;

    try {
        const artistExists = await Artist.findById(artist);

        if (!artistExists) {
            res.status(400).send('Artist not found');
            return;
        }

        const albumData = new Album({
            artist,
            title,
            year,
            image: req.file ? 'images' + req.file.filename : null,
        });

        await albumData.save();
        res.send(albumData);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/', async (req, res, next) => {
    try {
        const query = req.query.artist ? { artist: req.query.artist } : {};
        const albums = await Album.find(query);
        res.send(albums);
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const album = await Album.findById(id).populate('artist');

        if (!album) {
            res.status(404).send('Album not found');
            return;
        }
        res.send(album);
    } catch (e) {
        next(e);
    }
});

export default albumsRouter;