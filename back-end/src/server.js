import express from "express";
import initWebRoutes from "./routes/users";
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var connectDB = require("./config/connectDB");

var cors = require("cors");
require("dotenv").config();

//khai bao
const app = express();

app.use(logger("dev"));

//fix cross call api login
app.use(cors({ credentials: true, origin: true }));

//cookies
app.use(cookieParser());

//limit
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }, { extended: true }));

// //route
initWebRoutes(app);

//connectDB
connectDB();

const port = process.env.PORT || 2001;

app.listen(port, () => {
  console.log("backend nodeJS is running on the port: " + port);
});
