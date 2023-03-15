import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

const authAdmin = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role_id !== 1) {
      return res.status(401).json({ message: "Access denied" });
    }
    if (decoded.id) {
      const user = await db.User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      } else {
        req.user = decoded;
        next();
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Invalid token" });
  }
};

export default authAdmin;
