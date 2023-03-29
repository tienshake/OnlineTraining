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
router.get("/get", middleware.authUser, categoryController.getCategory);
router.put(
  "/edit/:id",
  middleware.authUser,
  middleware.authAdmin,
  categoryController.editCategory
);
router.delete(
  "/delete/:id",
  middleware.authUser,
  middleware.authAdmin,
  categoryController.deleteCategory
);

export default router;
