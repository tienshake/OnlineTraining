import courseController from "../controller/courseController";
import express from "express";
import middleware from "../middleware";

const router = express.Router();

router.get("/get", middleware.authUser, courseController.getCourse);
router.post("/create", middleware.authUser, courseController.createCourse);
router.put("/edit/:id", middleware.authUser, courseController.editCourse);

export default router;
