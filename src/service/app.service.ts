import { JWT_SECRETE } from "../config/system-variables";
import { AppRepository } from "../repository/app.repository";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
  static getUsersService = () => {
    return AppRepository.getUsers();
  };

  static addUserService = async (user: IAddUser) => {
    if (!user.age || !user.name || !user.email || !user.password) {
      throw new Error("All fields are required");
    }

    if (user.password.length < 3) {
      throw new Error("Password cannot be less than 3 characters");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    console.log(hashedPassword);

    // find the last object in the db
    const lastUser = AppRepository.getLastUser();

    //check the id
    // increment the id by 1
    const newId = lastUser.id + 1;

    // use the id for the next user
    const nextUser = { ...user, id: newId, password: hashedPassword };
    return AppRepository.addUser(nextUser);
  };

  static getUserByIdService = (id: string) => {
    if (!id) {
      throw new Error("Id cannot be empty");
    }
    //   if (isNaN(Number(id))) {
    //     throw new Error("Id must be a number");
    //   }
    const convId = parseInt(id);

    const response = AppRepository.getUserById(convId);

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
    const user = AppRepository.getUserByEmail(email);

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


  static getUserLocation = (userId: string)=>{
  
    const conv = parseInt(userId)

    const response = AppRepository.getUserLocation(conv)

    return response
  }
  
  static searchByUsername = (username: string,gender:string) => {
  const query:any = []
    if (username) {
      query.push(username)
    }
    if (gender) {
      query.push(gender)
      
    }


    // const response = AppRepository.searchByUsername(query)

    return "response"
  }
}

//check if passswd matches constraint
