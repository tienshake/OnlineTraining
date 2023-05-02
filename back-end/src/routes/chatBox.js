import chatBoxController from "../controller/chatBoxController";
import express from "express";

const router = express.Router();

router.get("/welcome", chatBoxController.welcomeUser);
router.post("/ask", chatBoxController.askBot);


export default router;
