import db from "../models";
import { sequelize } from "../models";
const { Op } = require("sequelize");

// const createCourse = async (req, res) => {
//   const {
//     //Course
//     title,
//     description,
//     price,
//     user_id,
//     category_id,
//     thumbnail,
//     promotion_price,
//     //Course section
//     title_section,
//     //Lecture
//     title_lecture,
//     video,
//   } = req.body;

//   try {
//     if (!title || !description || !price || !user_id || !category_id) {
//       res.status(400).json({ message: "Missing params" });
//     } else {
//       const course = await db.Course.create({
//         title,
//         description,
//         price,
//         user_id,
//         category_id,
//         promotion_price,
//         thumbnail,
//       });
//       if (course) {
//         const course_section = await db.Course_section.create({
//           title: title_section,
//           course_id: course.id,
//         });
//         if (course_section) {
//           const lecture = await db.Lecture.create({
//             course_section_id: course_section.id,
//             title: title_lecture,
//             video,
//           });

//           if (lecture) {
//             res.status(200).json({
//               data: {
//                 course,
//                 course_section,
//                 lecture,
//               },
//               code: 0,
//               message: "Create course completed",
//             });
//           } else {
//             res.status(400).json({ message: "Create Lecture failed" });
//           }
//         } else {
//           res.status(400).json({ message: "Create course_section failed" });
//         }
//       } else {
//         res.status(400).json({ message: "Create course failed" });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      descriptionMarkdown,
      price,
      user_id,
      category_id,
      thumbnail,
      promotion_price,
      sections,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !user_id ||
      !category_id ||
      !sections ||
      !descriptionMarkdown
    ) {
      res.status(400).json({ message: "Missing params" });
    } else {
      const course = await db.Course.create({
        title,
        description,
        descriptionMarkdown,
        price,
        user_id,
        category_id,
        thumbnail,
        promotion_price,
      });
      if (!course) {
        res.status(400).json({ message: "Create course failed" });
      }
      if (sections && sections.length > 0) {
        for (const section of sections) {
          const { title: sectionTitle, lectures } = section;

          const courseSection = await db.Course_section.create({
            course_id: course.id,
            title: sectionTitle,
          });
          if (!courseSection) {
            res.status(400).json({ message: "Create courseSection failed" });
          }

          if (lectures && lectures.length > 0) {
            for (const lecture of lectures) {
              const { name, videoLink } = lecture;

              const lecture_data = await db.Lecture.create({
                course_section_id: courseSection.id,
                title: name,
                video: videoLink,
              });
              if (!lecture_data) {
                res.status(400).json({ message: "Create lecture_data failed" });
              }
            }
          }
        }
      }

      res.status(200).json({
        data: course,
        code: 0,
        message: "Create course completed",
      });
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
        data: course,
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

const searchCourse = async (req, res) => {
  const { search } = req.query;
  try {
    if (!search) {
      res.status(400).send("Missing params");
    } else {
      const results = await db.Course.findAll({
        where: {
          [Op.or]: [
            { title: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ],
        },
      });

      res
        .status(200)
        .json({ code: 0, message: "Search completed", data: results });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export default {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
  searchCourse,
};
