"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeCache = void 0;
const express_1 = __importDefault(require("express"));
const sharp_1 = __importDefault(require("sharp"));
const node_cache_1 = __importDefault(require("node-cache"));
const checkImage_1 = __importDefault(require("../middleware/checkImage"));
const validateQuery_1 = __importDefault(require("../middleware/validateQuery"));
const app_1 = require("../app");
const api = express_1.default.Router();
const nodeCache = new node_cache_1.default();
exports.nodeCache = nodeCache;
// so in this endpoint it passes throw two middlewares:
//validateQuery: is to check wheter the dimensions are valid or not.
//  checkImage : to check wheter it already in the cache or not
api.get("/image", validateQuery_1.default, checkImage_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filename, width, height } = req.query;
    // converting the width and height to numbers
    let Width = parseInt(width); // converting width to numbers
    let Height = parseInt(height); // converting height to numbers
    try {
        const image = yield (0, sharp_1.default)(`images/${filename}.jpg`)
            .resize(Width, Height)
            .jpeg();
        const keyToCache = `${filename}${width}${height}`; // this is an id for each image with it name and format to check
        nodeCache.set(keyToCache, image);
        yield image.toFile(`images/thumbnails/${keyToCache}.jpeg`);
        //const newpath = path.join(__dirname+"../../images");
        //console.log(newpath);
        res.status(200).sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
            root: app_1.relativePath,
        });
    }
    catch (err) {
        console.log(err);
        res.status(404).send("this image is not found"); //
    }
    //    await image.toFile("C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg",(err,info)=>{
    //     console.log(info);
    //    })
    //res.sendFile('C:\\Users\\hp\\Desktop\\Mans1611\\Udacity FullStack\\projects\\Image Processing\\images\\image.jpg');
}));
exports.default = api;
