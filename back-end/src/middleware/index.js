import jwt from "jsonwebtoken";
import db from "../models";
require("dotenv").config();

const verifyToken = async (token) => {
  if (!token) {
    throw new Error("Invalid token");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid token");
  }
};

const authUser = async (req, res, next) => {
  let token = null;
  const authHeader = req.headers["authorization"];
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  }

  try {
    const decoded = await verifyToken(token);
    const user = await db.User.findByPk(decoded.id);
    if (!user) {
      throw new Error("User not found");
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

const authAdmin = async (req, res, next) => {
  try {
    const decoded = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );
    const role = await db.Role.findByPk(+decoded.role_id);
    if (role.role_name !== "admin") {
      throw new Error("You are not admin");
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

export default { authUser, authAdmin };
