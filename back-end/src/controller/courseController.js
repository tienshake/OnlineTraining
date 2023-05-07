import db from "../models";
import { sequelize } from "../models";
import getVideoDuration from "../utils/getTime";
const { Op } = require("sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only jpg, png, mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

var upload = multer({ storage }).array("video", 10); // 10 is the maximum number of files

const createLectureCourse = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      const sections = JSON.parse(req.body.sections);
      const {
        title,
        description,
        descriptionMarkdown,
        price,
        user_id,
        category_id,
        thumbnail,
        promotion_price,
      } = JSON.parse(req.body.dataCourse);

      if (err) {
        return res.status(400).json({
          message: err.message, // Use err.message instead of err
        });
      }

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

      if (
        !title ||
        !description ||
        !price ||
        !user_id ||
        !category_id ||
        !descriptionMarkdown
      ) {
        res.status(400).json({ message: "Missing params" });
      } else {
        if (sections && sections.length > 0) {
          for (let i = 0; i < sections.length; i++) {
            const courseSection = await db.Course_section.create({
              course_id: course.id,
              title: sections[i].title,
            });

            if (sections[i].lectures) {
              sections[i].lectures.forEach(async (lecture, index) => {
                const filename = req.files && req.files[index]?.filename;
                const totalTime = await getVideoDuration(`uploads/${filename}`);
                // const filePath = req.files[index].path;
                await db.Lecture.create({
                  course_section_id: courseSection.id,
                  title: lecture.title,
                  filename,
                  totalTime,
                });
              });
            }
          }
        }
      }

      return res.status(200).json({
        data: {
          success: true,
          fileName: req.files[0].filename, // Use req.files instead of res.req.file
          filePath: req.files[0].path,
        },
        code: 0,
        message: "Create course completed",
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

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
          {
            model: db.Enrollment,
            attributes: [
              [
                sequelize.literal(
                  "(SELECT COUNT(DISTINCT `user_id`) FROM `Enrollments` WHERE `course_id` = `Course`.`id`)"
                ),
                "enrollment_count",
              ],
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
  const { courseId, userId = -1 } = req.query;

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
              attributes: ["id", "title", "totalTime", "filename"],
            },
          ],
        },
      ],
      // nest: true,
    });

    let totalTime = 0;

    if (course && course.course_sections) {
      course.course_sections.forEach((section) => {
        if (section.lectures) {
          section.lectures.forEach((lecture) => {
            totalTime += lecture.totalTime;
          });
        }
      });
    }
    // console.log("course", course);
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
          lecture.filename = null;
        });
      });
    }

    res.status(200).json({
      data: course,
      totalTime: totalTime,
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

  const t = await sequelize.transaction();

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

  try {
    // upload(req, res, async (err) => {

    //   const sections = JSON.parse(req.body.sections);
    //   if(sections) {

    //   }
    //   const {
    //     title,
    //     category_id,
    //     thumbnail,
    //     price,
    //     promotion_price,
    //     description,
    //     descriptionMarkdown,
    //   } = JSON.parse(req.body.dataCourse);

    //   if (err) {
    //     return res.status(400).json({
    //       message: err.message, // Use err.message instead of err
    //     });
    //   }

    //   return res.status(200).json({
    //     data: {
    //       success: true,
    //       fileName: req.files[0].filename, // Use req.files instead of res.req.file
    //       filePath: req.files[0].path,
    //     },
    //     code: 0,
    //     message: "Create course completed",
    //   });
    // });

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
  const { keyword } = req.query;
  try {
    if (!keyword) {
      res.status(400).send("Missing params");
    } else {
      const results = await db.Course.findAll({
        where: {
          [Op.or]: [{ title: { [Op.like]: `%${keyword}%` } }],
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

    const role = await db.Role.findByPk(user.role_id);

    let userCourses = [];
    if (role.role_name === "teacher") {
      // Lấy tất cả khoá học của giảng viên đó
      userCourses = await db.Course.findAll({
        where: { user_id },
        attributes: {
          include: [
            [
              sequelize.fn("COUNT", sequelize.col("Enrollments.user_id")),
              "enrollment_count",
            ],
            [
              sequelize.fn("AVG", sequelize.col("Ratings.rating_value")),
              "rating",
            ],
            [
              sequelize.literal(`(
                SELECT SUM(lectures.totalTime)
                FROM Course_sections
                INNER JOIN Lectures AS lectures ON Course_sections.id = lectures.course_section_id
                WHERE Course_sections.course_id = Course.id
              )`),
              "totalTime",
            ],
          ],
        },
        include: [
          {
            model: db.Enrollment,
            attributes: [],
          },
          {
            model: db.Rating,
            attributes: [],
          },
        ],
        group: ["Course.id"],
        nest: true,
      });
    } else if (role.role_name === "student") {
      // Lấy khoá học mà học sinh đã đăng ký
      const enrollments = await db.Enrollment.findAll({
        where: { user_id },
        attributes: ["course_id"],
        nest: true,
      });
      const courseIds = enrollments.map((enrollment) => enrollment.course_id);
      userCourses = await db.Course.findAll({
        where: { id: courseIds },
        attributes: {
          include: [
            [
              sequelize.fn("COUNT", sequelize.col("Enrollments.user_id")),
              "enrollment_count",
            ],
            [
              sequelize.fn("AVG", sequelize.col("Ratings.rating_value")),
              "rating",
            ],
            [
              sequelize.literal(`(
                SELECT SUM(lectures.totalTime)
                FROM Course_sections
                INNER JOIN Lectures AS lectures ON Course_sections.id = lectures.course_section_id
                WHERE Course_sections.course_id = Course.id
              )`),
              "totalTime",
            ],
          ],
        },
        include: [
          {
            model: db.Enrollment,
            attributes: [],
          },
          {
            model: db.Rating,
            attributes: [],
          },
        ],
        group: ["Course.id"],
        nest: true,
      });
    }

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

const getVideoByFilename = async (req, res) => {
  const { filename } = req.params;
  const filePath = `uploads/${filename}`;

  if (!filePath) {
    return res.status(404).send("File not found");
  }

  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunksize = end - start + 1;
    const file = fs.createReadStream(filePath, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };
    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
};

const deleteEnrollment = async (req, res) => {
  const { user_id, course_id } = req.query;

  try {
    if (!user_id || !course_id) {
      return res.status(400).json({ message: "Missing params" });
    }

    // Kiểm tra xem student đã đăng ký khoá học chưa
    const enrollment = await db.Enrollment.findOne({
      where: { user_id, course_id },
    });

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Xoá enrollment
    await db.Enrollment.destroy({ where: { user_id, course_id } });

    res.status(200).json({
      code: 0,
      message: "Delete enrollment successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getCourseByCategory = async (req, res) => {
  const categoryIds = req.query.id.split(",").map(Number);

  try {
    const courses = await db.Course.findAll({
      where: { category_id: { [Op.or]: categoryIds } },
    });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
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
  createLectureCourse,
  getVideoByFilename,
  deleteEnrollment,
  getCourseByCategory,
};
