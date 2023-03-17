import db from "../models";
import { sequelize } from "../models";

const createCategory = async (req, res) => {
  const { name_category } = req.body;

  try {
    if (!name_category) {
      res.status(400).json({ message: "Missing params" });
    } else {
      const category = await db.Category.create({
        name_category,
      });
      if (category) {
        res.status(200).json({
          code: 0,
          message: "Create category completed",
        });
      } else {
        res.status(400).json({ message: "Create category failed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createCategory,
};
