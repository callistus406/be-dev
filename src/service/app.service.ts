import {
  getUsers,
  addUser,
  getLastUser,
  getUserById,
} from "../repository/app.repository";

export interface IAddUser {
  name: string;
  password: string;
  age: number;
  email: string;
  username: string;
}

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
