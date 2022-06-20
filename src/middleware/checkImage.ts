import express from "express";
import NodeCache from "node-cache";

import { relativePath } from "../app";
import { nodeCache } from "../utilities/processingImage";

const checkImage = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let { filename, width, height } = req.query;
  const keyToCache = `${filename}-${width}-${height}`;
  // this if condition will check if the image is in the cash or not, if it exist it will return the image through res without passing to next middleware
  if (nodeCache.get(keyToCache)) {
    res.status(201).sendFile(`images/thumbnails/${filename}.jpeg`, { 
      root: relativePath,
    });
  } 
  // if it not it will pass to the next middleware which it creates an image
  else {
    next();
  }
};

export default checkImage;
