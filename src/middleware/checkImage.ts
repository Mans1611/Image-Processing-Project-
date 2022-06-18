import express from "express";
import NodeCache from 'node-cache';
import { nodeCache } from "../routes/api";


const checkImage = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
    let { filename, width, height } = req.query;
    const keyToCache = `${filename}${width}${height}`;
  if(nodeCache.get(keyToCache)){
    console.log("found in the cache");
    console.log(nodeCache.get(keyToCache));
    res.sendFile(`images/thumbnails/${filename}.jpeg`, {
        root: "C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing",
      });

  }else{
    console.log("not found");
    next();

  }
};

export default checkImage;
