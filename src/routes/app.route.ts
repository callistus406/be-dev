import express from "express";
import { AppController } from "../controller/app.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/users",  AppController.getUsers);

router.post("/user", AppController.addUser);
router.get("/user/search", AppController.searchByUsername);


router.get("/user/:userId", AppController.getUserById);
router.delete("/user/:id", AppController.deleteUserById);
router.get("/user/:userId/location", AppController.getUserLocation);
router.post("/login", AppController.login);

export default router;


// className.methodName


// username, email , age , firstname, lastname