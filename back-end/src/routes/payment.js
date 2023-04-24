import paymentController from "../controller/payment";
import middleware from "../middleware";
import express from "express";

const router = express.Router();

router.post(
  "/create",
  middleware.authUser,
  paymentController.paymentEnrollment
);
router.get("/check", middleware.authUser, paymentController.checkPayment);
router.get(
  "/get/:create_user_id",
  middleware.authUser,
  paymentController.getPayment
);

export default router;
