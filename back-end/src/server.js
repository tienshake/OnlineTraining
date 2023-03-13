import express from "express";
import initWebRoutes from "./routes";
import logger from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB";

var cors = require("cors");
require("dotenv").config();

const app = express();

//fix cross call api login
app.use(cors({ credentials: true, origin: true }));

app.use(logger("dev"));
app.use(cookieParser());

//limit mb file blog DB
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }, { extended: true }));

//Run functions
initWebRoutes(app);
connectDB();

const port = process.env.PORT || 2001;

app.listen(port, () => {
  console.log("backend nodeJS is running on the port: " + port);
});
