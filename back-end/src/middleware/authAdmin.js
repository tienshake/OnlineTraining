import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

const authAdmin = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const role = await db.Role.findByPk(+decoded.role_id);
    if (role.role_name !== "admin") {
      return res.status(401).json({ message: "You are not admin" });
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
