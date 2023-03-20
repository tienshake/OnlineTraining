import ratingController from "../controller/ratingController";
import middleware from "../middleware";
import express from "express";

const router = express.Router();

router.post("/create", ratingController.createRating);
router.get("/get-by-course-id/:id", ratingController.getAllRatingsByCourseId);
router.put("/edit/:id", ratingController.updateRating);
router.delete("/delete/:id", ratingController.deleteRating);

export default router;
