import { Response } from "express";

export const sayhello = (req: any, res: Response) => {
  res.status(400).json({ message: "hello this is from our express server" });
};

export const users = (req: any, res: Response) => {
  const data = [
    {
      name: "celine",
      age: 50,
      email: "this@e.com",
    },
    {
      name: "mack",
      age: 30,
      email: "john@e.com",
    },
    {
      name: "mack",
      age: 50,
      email: "this@e.com",
    },
  ];

    res.status(400).json({
        message: "Request successful",
        users: data
    });
};
