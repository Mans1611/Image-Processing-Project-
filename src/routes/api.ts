import express from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import sharp from "sharp";
import NodeCache from "node-cache";
import checkImage from "../middleware/checkImage";
import validateQuery from "../middleware/validateQuery";
import { relativePath } from "../app";

const api = express.Router();

const nodeCache = new NodeCache();

// so in this endpoint it passes throw two middlewares:
//validateQuery: is to check wheter the dimensions are valid or not.
//  checkImage : to check wheter it already in the cache or not
api.get(
  "/image",
  validateQuery,
  checkImage,
  async (req: express.Request, res: express.Response) => {
    let { filename, width, height } = req.query;

    // converting the width and height to numbers
    let Width: number = parseInt(width as unknown as string); // converting width to numbers
    let Height: number = parseInt(height as unknown as string); // converting height to numbers

    try {
      const image = await sharp(`images/${filename}.jpg`)
        .resize(Width, Height)
        .jpeg();

      const keyToCache = `${filename}${width}${height}`; // this is an id for each image with it name and format to check

      nodeCache.set(keyToCache, image);
      await image.toFile(`images/thumbnails/${keyToCache}.jpeg`);

      res.status(201).sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
        root: relativePath,
      });
    } catch (err) {
      res.status(404).send("this image is not found"); //
    }

    //    await image.toFile("C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg",(err,info)=>{
    //     console.log(info);

    //    })

    //res.sendFile('C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg');
  }
);
export { nodeCache };
export default api;
