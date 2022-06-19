import express from "express";
import NodeCache from "node-cache";
import { nodeCache } from "../routes/api";
import { relativePath } from "../app";

const checkImage = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let { filename, width, height } = req.query;
  const keyToCache = `${filename}${width}${height}`;
  if (nodeCache.get(keyToCache)) {
    //console.log(nodeCache.get(keyToCache));
    res.status(201).sendFile(`images/thumbnails/${filename}.jpeg`, {
      root: relativePath,
    });
  } else {
    next();
  }
};

export default checkImage;
