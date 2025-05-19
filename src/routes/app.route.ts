import express from "express";
import { addUserController, getUserByIdController, getUsersController } from "../controller/app.controller";

const router = express.Router();

router.get("/users", getUsersController);

router.post("/user", addUserController);
router.get("/user/:userId", getUserByIdController);

export default router;
