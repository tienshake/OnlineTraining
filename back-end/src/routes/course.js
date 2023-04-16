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
router.get(
  "/search",
  // middleware.authAdmin,
  middleware.authUser,
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
export default router;
