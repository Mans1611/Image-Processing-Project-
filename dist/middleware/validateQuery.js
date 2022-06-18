"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateQuery = (req, res, next) => {
    let { width, height } = req.query;
    let checkValidateWidth = width.match(/[^0-9]/ig);
    let checkValidateHeight = height.match(/[^0-9]/ig);
    try {
        if (checkValidateWidth || checkValidateHeight)
            throw new Error("write just numbers to the query please");
        next();
    }
    catch (err) {
        res.status(401).send("The dimensions is not valid");
    }
};
exports.default = validateQuery;
