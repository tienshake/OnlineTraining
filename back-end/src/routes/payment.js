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

export default router;
