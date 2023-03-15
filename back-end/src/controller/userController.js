import db from "../models";
import hashUserPassword from "../utils/hashUserPassword";
import checkUserEmail from "../utils/checkUserEmail";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";

const createUser = async (req, res) => {
  const { name, email, password, role_id = 1 } = req.body;
  try {
    if (!name || !email || !password || !role_id) {
      res.status(400).json({ message: "Missing params" });
    } else {
      const hashedPassword = await hashUserPassword(password);
      const user = await db.User.create({
        name,
        email,
        password: hashedPassword,
        role_id,
      });
      if (user) {
        res.status(200).json({
          code: 0,
          message: "Create user completed",
        });
      } else {
        res.status(400).json({ message: "Create user failed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role_id } = req.body;
  try {
    const user = await db.User.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      user.role_id = role_id;
      await user.save();
      res.status(200).json({ user, code: 0, message: "Edit user completed" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser = async (req, res) => {
  const { id } = req.query;
  try {
    let user = null;
    if (id === "ALL") {
      user = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        raw: true,
      });
    } else {
      user = await db.User.findByPk(id);
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      if (user.dataValues) delete user.dataValues.password;
      res.status(200).json({
        code: 0,
        message: "Get user completed",
        user,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      await user.destroy();
      return res.status(200).json({
        code: 0,
        message: "Delete user completed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const register = async (req, res) => {
  const { name, email, password, role_id = 1 } = req.body;
  try {
    let isExist = await checkUserEmail(email);
    if (isExist) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hashUserPassword(password);
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
      role_id: role_id,
    });
    if (!user) {
      return res.status(400).json({ message: "Register don't completed" });
    } else {
      return res
        .status(200)
        .json({ code: 0, message: "Register completed", user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let userData = {};
    let isExist = await checkUserEmail(email);
    if (isExist) {
      const user = await db.User.findOne({
        where: { email: email },
        raw: true,
      });
      if (user) {
        const check = await bcrypt.compareSync(password, user.password);
        if (check) {
          delete user.password;
          userData = {
            ...user,
          };
          const accessToken = await generateToken.generateAccessToken(user);
          const refreshToken = await generateToken.generateRefreshToken(user);
          userData.token = accessToken;
          userData.refreshToken = refreshToken;
        } else {
          return res.status(400).json({ message: "Wrong password" });
        }
        return res
          .status(200)
          .json({ user: userData, code: 0, message: "Login completed" });
      } else {
        return res.status(400).json({ message: "User's not found" });
      }
    } else {
      return res.status(400).json({
        message:
          "Your's email isn't exist in your system. Please try other email",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  getUser,
  createUser,
  editUser,
  deleteUser,
  register,
  login,
};
