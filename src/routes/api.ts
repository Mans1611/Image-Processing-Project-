import express from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import sharp from "sharp";
import NodeCache from "node-cache";
import checkImage from "../middleware/checkImage";
import validateQuery from "../middleware/validateQuery";
import { relativePath } from "../app";
import proccessingImage from "../utilities/processingImage";

const api = express.Router();



// so in this endpoint it passes throw two middlewares:
//validateQuery: is to check wheter the dimensions are valid or not.
//  checkImage : to check wheter it already in the cache or not
api.get(
  "/image",
  validateQuery,
  checkImage,
  async (req: express.Request, res: express.Response):Promise<void> => {
    let { filename, width, height } = req.query;

    // converting the width and height to numbers
    let Width: number = parseInt(width as unknown as string); // converting width to numbers
    let Height: number = parseInt(height as unknown as string); // converting height to numbers

    try {
      await proccessingImage((filename as string),Width,Height);
      const keyToCache = `${filename}-${Width}-${Height}`; // this is an id for each image with it name and format to check
      res.status(201).sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
        root: relativePath,
      });
      console.log("passed");
      
    } catch (err) {
      res.status(404).send("this image is not found"); //
    }

   
  }
);

export default api;
