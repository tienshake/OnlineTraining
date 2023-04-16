import db from "../models";
import { sequelize } from "../models";
const { Op } = require("sequelize");
// import moment from "moment";

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
    console.log("sections", sections);
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

      if (course) {
        await db.Course_detail.create({
          course_id: course.id,
          description,
          descriptionMarkdown,
        });
      }

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
              const { title, video } = lecture;

              const lecture_data = await db.Lecture.create({
                course_section_id: courseSection.id,
                title,
                video,
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
  const { page = 1, limit = 10, id, sort_by } = req.query;

  try {
    let course = null;
    let count = null;
    let order = [];

    // Add order based on sort_by
    switch (sort_by) {
      case "top":
        order = [
          [
            sequelize.literal(
              "(SELECT DISTINCT AVG(`rating_value`) FROM `Ratings` WHERE `Ratings`.`course_id` = `Course`.`id`)"
            ),
            "DESC",
          ],
        ];
        break;
      case "new":
        order = [["createdAt", "DESC"]];
        break;
      default:
        order = [["updatedAt", "DESC"]];
        break;
    }

    if (id === "ALL") {
      let offset = (page - 1) * limit;
      course = await db.Course.findAll({
        order,
        limit: +limit,
        offset: +offset,
        include: [
          {
            model: db.Course_detail,
            as: "course_detail",
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name"],
            include: [
              {
                model: db.User_detail,
                as: "user_details",
                attributes: ["avatar"],
              },
            ],
          },
          {
            model: db.Rating,
            attributes: [
              [
                sequelize.literal(
                  "(SELECT DISTINCT AVG(`rating_value`) FROM `Ratings` WHERE `Ratings`.`course_id` = `Course`.`id`)"
                ),
                "avg_rating_value",
              ],
            ],
            group: ["Course.id"],
          },
        ],
        nest: true,
      });

      count = await db.Course.count();
    } else {
      course = await db.Course.findOne({
        where: { id: id },
        include: [
          {
            model: db.Course_detail,
            as: "course_detail",
          },
          {
            model: db.Rating,
            attributes: [
              [
                sequelize.literal(
                  "(SELECT AVG(`rating_value`) FROM `Ratings` WHERE `Ratings`.`course_id` = `Course`.`id`)"
                ),
                "avg_rating_value",
              ],
            ],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["id", "name"],
            include: [
              {
                model: db.User_detail,
                as: "user_details",
                attributes: [
                  "avatar",
                  "about_me",
                  "experience",
                  "education",
                  "gender",
                  "address",
                ],
              },
            ],
          },
        ],
        raw: true,
        nest: true,
      });
    }

    if (!course) {
      res.status(404).json({ message: "Course not found" });
    } else {
      res.status(200).json({
        code: 0,
        message: "Get Course completed",
        data:
          course && course?.length > 0
            ? {
                count: count,
                rows: course,
              }
            : course,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourseSection = async (req, res) => {
  const { courseId, userId } = req.query;

  try {
    let course = {};
    if (!courseId) {
      res.status(400).json({ message: "Missing params" });
    }

    course = await db.Course.findOne({
      where: { id: courseId },
      attributes: ["id", "user_id"],
      include: [
        {
          model: db.Enrollment,
          where: { user_id: userId, course_id: courseId },
          required: false, // JOIN bảng enroll với course
        },
        {
          model: db.Course_section,
          as: "course_sections",
          include: [
            {
              model: db.Lecture,
              as: "lectures",
              attributes: ["id", "title", "video"],
            },
          ],
        },
      ],
      // nest: true,
    });

    if (!course) {
      res.status(400).json({ message: "Course not found" });
    }

    let enrolled = false;

    if (course.user_id === +userId) {
      enrolled = true;
    } else {
      enrolled = course.Enrollments.length > 0;
    }

    // Update video field to NULL if user is not enrolled
    if (!enrolled) {
      course.course_sections.forEach((section) => {
        section.lectures.forEach((lecture) => {
          lecture.video = null;
        });
      });
    }

    res.status(200).json({
      data: course,
      code: 0,
      message: "Get course completed",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const editCourse = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    category_id,
    thumbnail,
    price,
    promotion_price,
    description,
    descriptionMarkdown,
    sections,
  } = req.body;

  const t = await sequelize.transaction();

  try {
    // Update Course
    await db.Course.update(
      { title, price, category_id, promotion_price, thumbnail },
      { where: { id } }
    );

    // Update Course
    await db.Course_detail.update(
      { description, descriptionMarkdown },
      { where: { course_id: id } }
    );
    // console.log("JSON.parse(dataSection)", sections);

    for (const section of sections) {
      await db.Course_section.update(
        { title: section.title },
        { where: { id: section.id } }
      );

      for (const lecture of section.lectures) {
        await db.Lecture.update(
          { title: lecture.title, video: lecture.video },
          { where: { id: lecture.id } }
        );
      }
    }
    // Commit transaction
    await t.commit();

    res.status(200).send({ code: 0, message: "Update successfully" });
  } catch (error) {
    // Rollback transaction if there is any error
    await t.rollback();
    console.log(error);
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

const getMyCourses = async (req, res) => {
  const { user_id } = req.params;

  try {
    if (!user_id) {
      return res.status(404).json({ message: "Missing params" });
    }
    const user = await db.User.findOne({ where: { id: user_id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userCourses = await db.Course.findAll({
      where: { user_id },
      include: [
        // {
        //   model: db.Course_detail,
        //   as: "course_detail",
        // },
        // {
        //   model: db.Rating,
        //   attributes: [
        //     [
        //       sequelize.literal(
        //         "(SELECT AVG(`rating_value`) FROM `Ratings` WHERE `Ratings`.`course_id` = `Course`.`id`)"
        //       ),
        //       "avg_rating_value",
        //     ],
        //   ],
        // },
      ],
      nest: true,
    });

    res.status(200).json({
      code: 0,
      message: "Get User Courses completed",
      data: userCourses,
    });
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
  searchCourse,
  getCourseSection,
  getMyCourses,
};
