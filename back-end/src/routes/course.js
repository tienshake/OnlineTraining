import courseController from "../controller/courseController";
import express from "express";
import middleware from "../middleware";

const router = express.Router();

router.get(
  "/get",
  // middleware.authUser,
  // middleware.authAdminOrTeacher,
  courseController.getCourse
);
router.post(
  "/create",
  // middleware.authTeacher,
  middleware.authUser,
  middleware.authAdminOrTeacher,
  courseController.createCourse
);

router.post(
  "/create-lecture",
  // middleware.authTeacher,
  // middleware.authUser,
  // middleware.authAdminOrTeacher,
  courseController.createLectureCourse
);

router.put(
  "/edit/:id",
  // middleware.authTeacher,
  middleware.authUser,
  middleware.authAdminOrTeacher,
  courseController.editCourse
);
router.delete(
  "/delete/:id",
  middleware.authUser,
  middleware.authAdminOrTeacher,
  courseController.deleteCourse
);
router.delete(
  "/delete-enrollment",
  middleware.authUser,
  courseController.deleteEnrollment
);
router.get(
  "/search",
  // middleware.authAdmin,
  courseController.searchCourse
);

router.get(
  "/get-section",
  // middleware.authAdmin,
  // middleware.authUser,
  courseController.getCourseSection
);

router.get(
  "/get-my-course/:user_id",
  // middleware.authAdmin,
  // middleware.authAdminOrTeacher,
  middleware.authUser,
  courseController.getMyCourses
);

router.get(
  "/video/:filename",
  // middleware.authAdmin,
  // middleware.authUser,
  courseController.getVideoByFilename
);

router.get(
  "/get-by-category",
  // middleware.authAdmin,
  // middleware.authUser,
  courseController.getCourseByCategory
);

export default router;
