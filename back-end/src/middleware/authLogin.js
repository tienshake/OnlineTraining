import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

const authLogin = async (req, res, next) => {
  const token = req.header("auth-token");
  try {
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.id) {
        const user = await db.User.findByPk(decoded.id);
        if (!user) {
          return res.status(401).json({ message: "User not found" });
        } else {
          req.user = decoded;
          next();
        }
      }
    } else {
      res.status(401).json("You are not authenticated");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Invalid token" });
  }
};

export default authLogin;
