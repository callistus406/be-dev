import { Request, Response } from "express";
import { AppService } from "../service/app.service";
import { asyncWrapper } from "../middleware/asyncWrapper";

export class AppController {
  static getUsers = async (req: any, res: Response) => {
    const response = await AppService.getUsersService();

    //send response to user
    res.status(200).json({
      message: "Request successful",
      data: response,
    });
  };

  static addUser = async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const response = await AppService.addUserService(data);

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

  static getUserById = async (req: Request, res: Response) => {
    try {
      const id = req.params.userId;

      const response = await AppService.getUserByIdService(id);

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

  static login = asyncWrapper(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const response = await AppService.loginService(email, password);

    res.status(200).json(response);
  });

  static getUserLocation = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const response = AppService.getUserLocation(userId);

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: "Bad Request",
        data: error.message,
      });
    }
  };

  static searchByUsername = (req: Request, res: Response) => {
    try {
      const { username, gender } = req.query;

      const response = AppService.searchByUsername(
        username as string,
        gender as string
      );

      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({
        message: "Bad Request",
        data: error.message,
      });
    }
  };

  static deleteUserById = asyncWrapper(async (req: Request, res: Response) => {
    const { id } = req.params;

    const response = await AppService.deleteUserById(id);

    res.status(200).json(response);
  });



  static updateUsers = asyncWrapper(async (req: Request, res: Response) => {
    const response = await AppService.updateUsers();
    res.status(200).json(response);
  });
}
