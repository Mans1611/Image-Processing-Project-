import express from "express";
// const express = require('express')
import api from "./routes/api";
const app = express();

const port = 3000;
app.use("/api", api);
const image = `<img src="image.jpg"/>`;
app.listen(port, () => {
  console.log("you are running on http://localhost:" + port);
});
export default image;
