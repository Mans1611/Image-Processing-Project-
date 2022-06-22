"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const processingImage_1 = require("../utilities/processingImage");
const checkImage = (req, res, next) => {
    let { filename, width, height } = req.query;
    const keyToCache = `${filename}-${width}-${height}`;
    // this if condition will check if the image is in the cash or not, if it exist it will return the image through res without passing to next middleware
    if (processingImage_1.nodeCache.get(keyToCache)) {
        res.status(201).sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
            root: app_1.relativePath,
        });
        console.log("passed throgh middle ware");
    }
    // if it not it will pass to the next middleware which it creates an image
    else {
        next();
    }
};
exports.default = checkImage;
