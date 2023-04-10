import ratingController from "../controller/ratingController";
import middleware from "../middleware";
import express from "express";

const router = express.Router();

router.post("/create", middleware.authUser, ratingController.createRating);
router.get("/get-by-course-id/:id", ratingController.getAllRatingsByCourseId);
router.put("/edit/:id", middleware.authUser, ratingController.updateRating);
router.delete(
  "/delete/:id",
  middleware.authUser,
  ratingController.deleteRating
);
router.get("/get-avg", ratingController.getAvgRating);

export default router;
