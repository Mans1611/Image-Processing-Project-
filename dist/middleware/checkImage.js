"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("../app");
const processingImage_1 = require("../utilities/processingImage");
const checkImage = (req, res, next) => {
    let { filename, width, height } = req.query;
    const keyToCache = `${filename}${width}${height}`;
    if (processingImage_1.nodeCache.get(keyToCache)) {
        //console.log(nodeCache.get(keyToCache));
        res.status(201).sendFile(`images/thumbnails/${filename}.jpeg`, {
            root: app_1.relativePath,
        });
    }
    else {
        next();
    }
};
exports.default = checkImage;
