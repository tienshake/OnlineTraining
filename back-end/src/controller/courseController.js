import db from "../models";
import { sequelize } from "../models";

const createCourse = async (req, res) => {
  const { title, description, price, user_id, category_id } = req.body;

  try {
    if (!title || !description || !price || !user_id || !category_id) {
      res.status(400).json({ message: "Missing params" });
    } else {
      const category = await db.Course.create({
        title,
        description,
        price,
        user_id,
        category_id,
      });
      if (category) {
        res.status(200).json({
          code: 0,
          message: "Create course completed",
        });
      } else {
        res.status(400).json({ message: "Create course failed" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourse = async (req, res) => {
  const { page = 1, limit = 10, id } = req.query;
  try {
    let course = null;
    if (id === "ALL") {
      let offset = (page - 1) * limit;
      course = await db.Course.findAndCountAll({
        order: [["updatedAt", "DESC"]],
        limit: +limit,
        offset: +offset,
        raw: true,
      });
    } else {
      course = await db.Course.findByPk(id);
    }
    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      res.status(200).json({
        code: 0,
        message: "Get Course completed",
        course,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    category_id,
    total_chapter,
    total_lectures,
    total_time,
    promotion_price,
    thumbnail,
    total_view,
  } = req.body;

  const t = await sequelize.transaction();
  try {
    // Update Course
    await db.Course.update(
      { title, description, price, category_id },
      { where: { id }, transaction: t }
    );

    // Update Course_detail
    if (
      total_chapter ||
      total_lectures ||
      total_time ||
      promotion_price ||
      thumbnail ||
      total_view
    ) {
      const [courseDetail, created] = await db.Course_detail.findOrCreate({
        where: { course_id: id },
        defaults: {
          course_id: id,
          total_chapter,
          total_lectures,
          total_time,
          promotion_price,
          thumbnail,
          total_view,
        },
        transaction: t,
      });
      if (!created) {
        await courseDetail.update(
          {
            total_chapter,
            total_lectures,
            total_time,
            promotion_price,
            thumbnail,
            total_view,
          },
          { transaction: t }
        );
      }
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
const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    const course = await db.Course.findByPk(id);
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    } else {
      await course.destroy();
      return res.status(200).json({
        code: 0,
        message: "Delete Course completed",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
};