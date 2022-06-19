import express from "express";
import path from "path";
import api from "./routes/api";
const app = express();
const relativePath = path.join(__dirname, ".."); // to get out of src
const port = 3000;
app.use("/api", api);

app.listen(port, () => {
  console.log("you are running on http://localhost:" + port);
});
export default app;
export { relativePath };
