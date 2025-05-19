import { Request, Response } from "express";
import {
  addUserService,
  getUserByIdService,
  getUsersService,
} from "../service/app.service";

export const sayhello = (req: any, res: Response) => {
  res.status(400).json({ message: "hello this is from our express server" });
};

export const getUsersController = (req: any, res: Response) => {
  const response = getUsersService();

  //send response to user
  res.status(400).json({
    message: "Request successful",
    data: response,
  });
};

export const addUserController = (req: Request, res: Response) => {
  try {
    const data = req.body;
    const response = addUserService(data);

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
