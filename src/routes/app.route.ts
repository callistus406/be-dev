import express from "express";
import { sayhello, users } from "../controller/app.controller";

const router = express.Router();

router.get("/home", sayhello);
router.get("/users", users);

export default router;
