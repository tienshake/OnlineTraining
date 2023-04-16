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
    // console.log(decoded);
    const user = await db.User.findByPk(+decoded.id);
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

const authRole = (role_name) => async (req, res, next) => {
  try {
    const decoded = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );

    const role = await db.Role.findByPk(+decoded.role_id);
    if (role.role_name !== role_name) {
      throw new Error(`You are not ${role_name}`);
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

const authAdminOrTeacher = async (req, res, next) => {
  try {
    const decoded = await verifyToken(
      req.headers["authorization"].split(" ")[1]
    );
    // console.log("decoded", decoded);
    const role = await db.Role.findByPk(+decoded.role_id);
    if (role.role_name !== "admin" && role.role_name !== "teacher") {
      throw new Error("You are not authorized to access this resource");
    }
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

// Use authRole
const authAdmin = authRole("admin");
const authTeacher = authRole("teacher");

export default { authUser, authAdmin, authTeacher, authAdminOrTeacher };
