import express from "express";

const validateQuery = (
  req: express.Request,
  res: express.Response,
  next: Function
): void => {
  let { width, height } = req.query;
  if (!width && height) {
    res
      .status(200)
      .send(
        `<h1 style="text-align:center;color:skyblue">Enter the width please</h1>`
      );
  } else if (width && !height) {
    res
      .status(200)
      .send(
        `<h1 style="text-align:center;color:skyblue">Enter the height please</h1>`
      );
  } else if (!width && !height) {
    res
      .status(200)
      .send(
        `<h1 style="text-align:center;color:skyblue">Enter the dimensions please</h1>`
      );
  } else {
    let checkValidateWidth: string[] | null = (
      width as unknown as string
    ).match(/[^0-9]/gi);
    let checkValidateHeight: string[] | null = (
      height as unknown as string
    ).match(/[^0-9]/gi);
    
    //console.log(checkValidateWidth);

    try {
      if (checkValidateWidth || checkValidateHeight)
        throw new Error("write just numbers to the query please");
      next();
    } catch (err) {
      res.status(401).send("The dimensions is not valid");
    }
  }
};
export default validateQuery;
