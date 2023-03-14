import userController from "../controller/userController";
import express from "express";

const router = express.Router();

router.post("/create", userController.createUser);
router.get("/get", userController.getUser);
router.put("/edit/:id", userController.editUser);
router.delete("/delete/:id", userController.deleteUser);

export default router;
