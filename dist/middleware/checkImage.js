"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_1 = require("../routes/api");
const app_1 = require("../app");
const checkImage = (req, res, next) => {
    let { filename, width, height } = req.query;
    const keyToCache = `${filename}${width}${height}`;
    if (api_1.nodeCache.get(keyToCache)) {
        console.log("found in the cache");
        //console.log(nodeCache.get(keyToCache));
        res.status(200).sendFile(`images/thumbnails/${filename}.jpeg`, {
            root: app_1.relativePath,
        });
    }
    else {
        console.log("not found");
        next();
    }
};
exports.default = checkImage;
