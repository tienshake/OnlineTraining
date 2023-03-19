import courseController from "../controller/courseController";
import express from "express";
import middleware from "../middleware";

const router = express.Router();

router.get(
  "/get",
  middleware.authUser,
  middleware.authAdminOrTeacher,
  courseController.getCourse
);
router.post(
  "/create",
  middleware.authUser,
  middleware.authTeacher,
  courseController.createCourse
);
router.put(
  "/edit/:id",
  middleware.authUser,
  middleware.authTeacher,
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
  middleware.authAdmin,
  middleware.authUser,
  courseController.searchCourse
);
export default router;
