import { Types } from "mongoose";
import { dbUsers } from "../db/db.database";
import { userModel } from "../models/user.model";

export interface IUser {
  email: string;
  gender: string;
  phone_number: string;
  age: number;

  id: number;
  location: {
    street: string;
    city: string;
    state: "string";
    postcode: number;
  };
  name: string;
  password: string;
  first_name: string;
  last_name: string;
  title: string;
  picture: string;
}

export class AppRepository {
  static getUsers = async () => {
    const users = await userModel.find().select("-password -location");

    return users;
  };

  static addUser = async (user: IUser) => {
    const response = await userModel.create(user);

    return response;
  };

  static getUserById = (id: Types.ObjectId) => {
    const response = userModel.findById(id).select("-password -location -__v");

    return response;
  };

  static getLastUser = () => {
    const lastUser = dbUsers[dbUsers.length - 1];

    return lastUser;
  };

  static getUserByEmail = async (email: string): Promise<any> => {
    const user = await userModel.findOne({ email: email });

    return user;
  };

  static getUserLocation = (userId: number) => {
    const response = dbUsers.find((item) => userId === item.id);

    return {
      street: response?.location.street,
      city: response?.location.city,
      postcode: response?.location.postcode,
      state: response?.location.state,
    };
  };
}
