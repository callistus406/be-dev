import express from "express";
import { AppController } from "../controller/app.controller";
import { validator } from "../middleware/validator.middleware";
import { addUserSchema, userSchema } from "../validation/user-schema";
// import { LoginDto } from "../dto/User.dto";

const router = express.Router();

router.get("/users", AppController.getUsers);

router.post("/user", validator(addUserSchema) as any, AppController.addUser);
router.get("/user/search", AppController.searchByUsername);

router.get("/user/:userId", AppController.getUserById);
router.patch("/user/update", AppController.updateUsers);
router.delete("/user/:id", AppController.deleteUserById);
router.get("/user/:userId/location", AppController.getUserLocation);

router.post("/login", validator(userSchema) as any, AppController.login);

export default router;

// className.methodName

// username, email , age , firstname, lastname

// /user?name=mom&pet=dog
// /user/:userId
// req.body
// req.param

// const { name, pet} = req.query



