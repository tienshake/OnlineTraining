import db from "../models";

const createUser = async (req, res) => {
  const { name, email, password, role_id = 1 } = req.body;
  try {
    if (!name || !email || !password || !role_id) {
      res.status(400).json({ message: "Missing params" });
    } else {
      const user = await db.User.create({ name, email, password, role_id });
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
  const { name, email, password } = req.body;
  try {
    const user = await db.User.findByPk(id);
    if (user) {
      user.name = name;
      user.email = email;
      user.password = password;
      await user.save();
      res.status(200).json({ code: 0, message: "Edit user completed" });
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
        raw: true,
      });
    } else {
      user = await db.User.findByPk(id);
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
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

export default {
  getUser,
  createUser,
  editUser,
  deleteUser,
};
