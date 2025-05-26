import express from "express";
import {
  addUserController,
  getUserByIdController,
  getUsersController,
  loginController,
} from "../controller/app.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/users", authMiddleware, getUsersController);

router.post("/user", addUserController);
router.get("/user/:userId", authMiddleware, getUserByIdController);
router.post("/login", loginController);

export default router;
