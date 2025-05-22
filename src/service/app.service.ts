import {
  getUsers,
  addUser,
  getLastUser,
  getUserById,
  getUserByEmail,
} from "../repository/app.repository";
import jwt from "jsonwebtoken";
export interface IAddUser {
  name: string;
  password: string;
  age: number;
  email: string;
  username: string;
}

const jwtSecrete = "qwerty78uytrertyuytryuiuytyuiu";
export const getUsersService = () => {
  return getUsers();
};

export const addUserService = (user: IAddUser) => {
  if (
    !user.age ||
    !user.name ||
    !user.email ||
    !user.password ||
    !user.username
  ) {
    throw new Error("All fields are required");
  }

  if (user.password.length < 3) {
    throw new Error("Password cannot be less than 3 characters");
  }
  // find the last object in the db
  const lastUser = getLastUser();

  //check the id
  // increment the id by 1
  const newId = lastUser.id + 1;

  // use the id for the next user
  const nextUser = { ...user, id: newId };
  return addUser(nextUser);
};

export const getUserByIdService = (id: string) => {
  if (!id) {
    throw new Error("Id cannot be empty");
  }
  //   if (isNaN(Number(id))) {
  //     throw new Error("Id must be a number");
  //   }
  const convId = parseInt(id);

  const response = getUserById(convId);

  return response;
};

//check if passswd matches constraint

export const loginService = (email: string, password: string) => {
  if (!email || !password) {
    throw new Error("Fields cannnot be empty");
  }

  if (!email.includes("@")) {
    throw new Error("Email is not a valid email address");
  }

  //get user by email
  const user = getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }
  // compare password

  if (user.password !== password) {
    // if error throw error
    throw new Error("Invalid password");
  }
  const payload = {
    username: user.username,
    email: user.email,
  };

  let jwtToken = jwt.sign(payload, jwtSecrete);
  console.log(jwtToken);

  console.log(jwtToken);
  return {
    message: "Login successful",
    authKey: jwtToken,
  };
  // return success msg
};
