import userController from "../controller/userController";
import express from "express";
import middleware from "../middleware";

const router = express.Router();

router.post(
  "/create",
  middleware.authAdmin,
  middleware.authUser,
  userController.createUser
);
router.get(
  "/get",
  middleware.authAdmin,
  middleware.authUser,
  userController.getUser
);
router.put(
  "/edit/:id",
  middleware.authAdmin,
  middleware.authUser,
  userController.editUser
);
router.delete(
  "/delete/:id",
  middleware.authAdmin,
  middleware.authUser,
  userController.deleteUser
);
router.post("/register", userController.register);
router.post("/login", userController.login);

export default router;
