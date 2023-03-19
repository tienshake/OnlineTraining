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

const getCategory = async (req, res) => {
  try {
    let category = null;
    category = await db.Category.findAll({
      raw: true,
    });
    if (!category) {
      res.status(404).json({ message: "Category not found" });
    } else {
      res.status(200).json({
        code: 0,
        message: "Get Category completed",
        data: category,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { name_category } = req.body;

  try {
    const category = await db.Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    await category.update({ name_category });

    res.status(200).send({ code: 0, message: "Update successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await db.Category.findOne({ where: { id } });
    if (!category) {
      return res.status(404).send({ message: "Category not found" });
    }
    await category.destroy();
    res.status(200).send({ code: 0, message: "Delete successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createCategory,
  getCategory,
  editCategory,
  deleteCategory,
};
