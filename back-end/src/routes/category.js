import categoryController from "../controller/categoryController";
import middleware from "../middleware";
import express from "express";

const router = express.Router();

router.post(
  "/create",
  middleware.authUser,
  middleware.authAdmin,
  categoryController.createCategory
);

export default router;
