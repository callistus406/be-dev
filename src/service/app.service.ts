import { JWT_SECRETE } from "../config/system-variables";
import { AppRepository } from "../repository/app.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Types } from "mongoose";

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
    if (!user.age || !user.name || !user.email || !user.password) {
      throw new Error("All fields are required");
    }

    if (user.password.length < 3) {
      throw new Error("Password cannot be less than 3 characters");
    }

    //user exists

    const isFound = await AppRepository.getUserByEmail(user.email);

    if (isFound) {
      throw new Error("Email exists");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(hashedPassword);

    // use the id for the next user
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
    if (!email || !password) {
      throw new Error("Fields cannnot be empty");
    }

    if (!email.includes("@")) {
      throw new Error("Email is not a valid email address");
    }

    //get user by email
    const user = await AppRepository.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    console.log(user.password);
    // compare password

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Invalid password");
    }

    // if (user.password !== password) {
    //   // if error throw error
    //   throw new Error("Invalid password");
    // }
    const payload = {
      username: user.name,
      email: user.email,
    };

    console.log(jwtSecrete);
    let jwtToken = jwt.sign(payload, JWT_SECRETE, { expiresIn: "1h" });

    console.log(jwtToken);
    return {
      message: "Login successful",
      authKey: jwtToken,
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
    //validate the id
    // check falsy value
    if (!id) throw new Error("Id is required");

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
}

//check if passswd matches constraint
