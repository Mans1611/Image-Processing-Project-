"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativePath = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const relativePath = path_1.default.join(__dirname, ".."); // to get out of src 
exports.relativePath = relativePath;
const port = 3000;
app.use("/api", api_1.default);
app.listen(port, () => {
    console.log("you are running on http://localhost:" + port);
});
exports.default = app;
