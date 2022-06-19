"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateQuery = (req, res, next) => {
    let { width, height } = req.query;
    if (!width && height) {
        res
            .status(200)
            .send(`<h1 style="text-align:center;color:skyblue">Enter the width please</h1>`);
    }
    else if (width && !height) {
        res
            .status(200)
            .send(`<h1 style="text-align:center;color:skyblue">Enter the height please</h1>`);
    }
    else if (!width && !height) {
        res
            .status(200)
            .send(`<h1 style="text-align:center;color:skyblue">Enter the dimensions please</h1>`);
    }
    else {
        let checkValidateWidth = width.match(/[^0-9]/gi);
        let checkValidateHeight = height.match(/[^0-9]/gi);
        //console.log(checkValidateWidth);
        try {
            if (checkValidateWidth || checkValidateHeight)
                throw new Error("write just numbers to the query please");
            next();
        }
        catch (err) {
            res.status(401).send("The dimensions is not valid");
        }
    }
};
exports.default = validateQuery;
