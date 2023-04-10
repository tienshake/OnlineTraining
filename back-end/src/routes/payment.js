import paymentController from "../controller/payment";
import middleware from "../middleware";
import express from "express";

const router = express.Router();

router.post("/create", paymentController.paymentEnrollment);
router.get("/check", paymentController.checkPayment);

export default router;
