import userController from "../controller/userController";
import express from "express";

const router = express.Router();

router.get("/", userController.getUser);
router.post("/create-user", userController.createUser);

export default router;