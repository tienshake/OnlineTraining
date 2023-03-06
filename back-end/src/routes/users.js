import express from "express";
import db from "../models/index";
const router = express.Router();

const initWebRoutes = (app) => {
  router.get("/", async function (req, res) {
    const user = await db.User.findOne({
      where: { name: "tien" },
      raw: true,
    });
    console.log(user);
    res.send("Hello World!");
  });

  return app.use("/", router);
};

export default initWebRoutes;
