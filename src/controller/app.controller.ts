import { Request, Response } from "express";
import {
  addUserService,
  getUserByIdService,
  getUsersService,
  loginService,
} from "../service/app.service";

export const sayhello = (req: any, res: Response) => {
  res.status(400).json({ message: "hello this is from our express server" });
};

export const getUsersController =  (req: any, res: Response) => {
  const response =  getUsersService();

  //send response to user
  res.status(200).json({
    message: "Request successful",
    data: response,
  });
};

export const addUserController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = await addUserService(data);

    //send response to user
    res.status(200).json({
      message: "Request successful",
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Bad Request",
      data: error.message,
    });
  }
};

export const getUserByIdController = (req: Request, res: Response) => {
  try {
    const id = req.params.userId;

    const response = getUserByIdService(id);

    res.status(200).json({
      message: "Request successful",
      data: response,
    });
  } catch (error: any) {
    res.status(400).json({
      message: "Bad Request",
      data: error.message,
    });
  }
};

export const loginController = async(req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const response = await loginService(email, password);

    res.status(200).json(response);
  } catch (error: any) {
    res.status(400).json({
      message: "Bad Request",
      data: error.message,
    });
  }
};
