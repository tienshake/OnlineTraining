import videoController from "../controller/videoController";
import express from "express";

const router = express.Router();

router.post("/upload", videoController.uploadVideo);
router.post("/uploads", videoController.createLectureCourse);
router.get("/get/:filename", videoController.getVideoByFilename);

export default router;
