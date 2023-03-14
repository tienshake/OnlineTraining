import userController from "../controller/userController";
import express from "express";
import authAdmin from "../middleware/authAdmin";

const router = express.Router();

router.post("/create", authAdmin, userController.createUser);
router.get("/get", authAdmin, userController.getUser);
router.put("/edit/:id", authAdmin, userController.editUser);
router.delete("/delete/:id", authAdmin, userController.deleteUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
