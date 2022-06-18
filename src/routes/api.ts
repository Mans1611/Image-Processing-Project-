import express from "express";
import { promises as fsPromises } from "fs";
import path from "path";
import sharp from "sharp";
import NodeCache from 'node-cache'
import checkImage from "../middleware/checkImage";
import image from "../app";

const api = express.Router();

const nodeCache = new NodeCache();



api.get("/image", checkImage, async (req, res) => {
    let { filename, width, height } = req.query;

  let Width: number = parseInt(width as unknown as string); // converting width to numbers
  let Height: number = parseInt(height as unknown as string); // converting height to numbers

  const image = await sharp(`images/${filename}.jpg`)
    .resize(Width, Height)
    .jpeg();
    const keyToCache = `${filename}${width}${height}`;
    console.log(keyToCache);
    nodeCache.set(keyToCache,image);
    await image.toFile(`images/thumbnails/${keyToCache}.jpeg`);

  //const newpath = path.join(__dirname+"../../images");
  //console.log(newpath);

  res.sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
    root: "C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing",
  });

  //    await image.toFile("C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg",(err,info)=>{
  //     console.log(info);

  //    })

  //res.sendFile('C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg');
});
export {nodeCache};
export default api;
