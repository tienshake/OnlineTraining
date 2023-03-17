import userController from "../controller/userController";
import express from "express";
import authAdmin from "../middleware/authAdmin";
import authLogin from "../middleware/authLogin";

const router = express.Router();

router.post("/create", authAdmin, authLogin, userController.createUser);
router.get("/get", authAdmin, authLogin, userController.getUser);
router.put("/edit/:id", authAdmin, authLogin, userController.editUser);
router.delete("/delete/:id", authAdmin, authLogin, userController.deleteUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
