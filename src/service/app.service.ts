import { JWT_SECRETE } from "../config/system-variables";
import { AppRepository } from "../repository/app.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import { throwCustomError } from "../middleware/errorHandler.midleware";
import axios from "axios";

export interface IAddUser {
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

const jwtSecrete = process.env.JWT_SECRETE as string;

export class AppService {
  static getUsersService = async () => {
    return await AppRepository.getUsers();
  };
  //=============================|| ADD USER SERVICE ||==============================
  static addUserService = async (user: IAddUser) => {
    //user exists

    const isFound = await AppRepository.getUserByEmail(user.email);

    if (isFound) {
      throw throwCustomError("Email exists", 409);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    if (!hashedPassword) throw throwCustomError("Something went wrong", 500);
    const nextUser = { ...user, password: hashedPassword };
    return AppRepository.addUser(nextUser);
  };

  static getUserByIdService = async (id: string) => {
    if (!id) {
      throw new Error("Id cannot be empty");
    }

    const mongoId = new Types.ObjectId(id);
    const response = await AppRepository.getUserById(mongoId);

    return response;
  };

  static loginService = async (email: string, password: string) => {
    //get user by email
    const user = await AppRepository.getUserByEmail(email);

    if (!user) {
      throw throwCustomError("invalid credentials", 401);
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw throwCustomError("Invalid email or password", 401);
    }

    const payload = {
      username: user.name,
      email: user.email,
    };

    console.log(jwtSecrete);
    let jwtToken = jwt.sign(payload, JWT_SECRETE, { expiresIn: "1h" });

    let data;

    try {
      // hghghg
      data = (await axios.get("https://jsonplaceholder.typicode.com/posts/iiuiuiu")).data;

      console.log(data);
    } catch (error) {

      console.log(error);
    }

    console.log(jwtToken);
    return {
      message: "Login successful",
      authKey: jwtToken,
      data
    };
    // return success msg
  };

  static getUserLocation = (userId: string) => {
    const conv = parseInt(userId);

    const response = AppRepository.getUserLocation(conv);

    return response;
  };

  static searchByUsername = (username: string, gender: string) => {
    const query: any = [];
    if (username) {
      query.push(username);
    }
    if (gender) {
      query.push(gender);
    }

    // const response = AppRepository.searchByUsername(query)

    return "response";
  };

  static async deleteUserById(id: string) {
    if (!id) throw throwCustomError("Id is required", 422);

    // check if id is a mongodb id
    if (!Types.ObjectId.isValid(id))
      throw new Error("Id is not a valid mongo id");

    // check id user exists

    const objectId = new Types.ObjectId(id);
    const isFound = await AppRepository.findUserById(objectId);
    if (!isFound) throw new Error("Record not found");
    // delete user

    const isDeleted = await AppRepository.deleteUserById(objectId);

    if (!isDeleted) throw new Error("Unable to delete record");

    return `${isFound.name} account has been deleted!`;
  }

  static async updateUsers() {
    return await AppRepository.updatedUsers();
  }
}

//check if passswd matches constraint
