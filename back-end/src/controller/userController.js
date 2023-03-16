import db from "../models";
import hashUserPassword from "../utils/hashUserPassword";
import checkUserEmail from "../utils/checkUserEmail";
import generateToken from "../utils/generateToken";
import bcrypt from "bcryptjs";
import { sequelize } from "../models";

const createUser = async (req, res) => {
  const { name, email, password, role_id = 1 } = req.body;

  try {
    if (!name || !email || !password || !role_id) {
      res.status(400).json({ message: "Missing params" });
    } else {
      let isExist = await checkUserEmail(email);
      if (isExist) {
        return res.status(400).json({ message: "Email already exists" });
      }
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

const createUserDetail = async (req, res) => {
  const {
    phone_number,
    address,
    about_me,
    avatar,
    experience,
    education,
    user_id,
  } = req.body;

  try {
    if (!user_id) {
      res.status(400).json({ message: "Missing id params" });
    } else {
      const user_detail = await db.User_detail.findOne({
        user_id,
      });
      if (user_detail) {
        return res.status(400).json({ message: "User already exists" });
      }
      const check = await db.User_detail.create({
        user_id,
        phone_number,
        address,
        about_me,
        avatar,
        experience,
        education,
      });
      if (check) {
        res.status(200).json({
          code: 0,
          message: "Create user detail completed",
        });
      } else {
        res.status(400).json({ message: "Create user detail failed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    phone_number,
    address,
    about_me,
    avatar,
    experience,
    education,
    age,
    gender,
  } = req.body;

  const t = await sequelize.transaction();
  try {
    // Update user
    await db.User.update({ name }, { where: { id }, transaction: t });

    // Update user_detail
    const [userDetail, created] = await db.User_detail.findOrCreate({
      where: { user_id: id },
      defaults: {
        user_id: id,
        phone_number,
        address,
        about_me,
        avatar,
        experience,
        education,
        age,
        gender,
      },
      transaction: t,
    });

    if (!created) {
      await userDetail.update(
        {
          phone_number,
          address,
          about_me,
          avatar,
          experience,
          education,
          age,
          gender,
        },
        { transaction: t }
      );
    }

    // Commit transaction
    await t.commit();

    res.status(200).send({ message: "Update successfully" });
  } catch (error) {
    // Rollback transaction if there is any error
    console.log(error);
    await t.rollback();
    res.status(500).send({ message: "Update failed" });
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
    if (!name || !email || !password || !role_id) {
      res.status(400).json({ message: "Missing params" });
    } else {
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
  createUserDetail,
};
