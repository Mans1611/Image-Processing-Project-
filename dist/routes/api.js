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
const express_1 = __importDefault(require("express"));
const checkImage_1 = __importDefault(require("../middleware/checkImage"));
const validateQuery_1 = __importDefault(require("../middleware/validateQuery"));
const app_1 = require("../app");
const processingImage_1 = __importDefault(require("../utilities/processingImage"));
const api = express_1.default.Router();
// so in this endpoint it passes throw two middlewares:
//validateQuery: is to check wheter the dimensions are valid or not.
//  checkImage : to check wheter it already in the cache or not
api.get("/image", validateQuery_1.default, checkImage_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { filename, width, height } = req.query;
    // converting the width and height to numbers
    let Width = parseInt(width); // converting width to numbers
    let Height = parseInt(height); // converting height to numbers
    try {
        yield (0, processingImage_1.default)(filename, Width, Height);
        const keyToCache = `${filename}-${Width}-${Height}`; // this is an id for each image with it name and format to check
        res.status(201).sendFile(`images/thumbnails/${keyToCache}.jpeg`, {
            root: app_1.relativePath,
        });
    }
    catch (err) {
        res.status(404).send("this image is not found"); //
    }
}));
exports.default = api;
