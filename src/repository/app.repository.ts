import { dbUsers } from "../db/db.database";

export interface IUser {
  id: number;
  name: string;
  password: string;
  age: number;
  email: string;
  username: string;
}
export const getUsers = () => {
  const users = dbUsers.map((user, idx) => {
    return {
      id: user.id,
      name: user.name,
      age: user.age,
      email: user.email,
      username: user.username,
    };
  });

  return users;
};

export const addUser = (user: IUser) => {
  //  step1
  dbUsers.push(user);
  // step 2
  const response = dbUsers.find((res) => user.id === res.id);

  return response;
};

export const getUserById = (id: number) => {
  const response = dbUsers.find((user) => user.id === id);

  return response;
};

export const getLastUser = () => {
  const lastUser = dbUsers[dbUsers.length - 1];

  return lastUser;
};

export const getUserByEmail = (email: string) => {
  const user = dbUsers.find((user) => user.email === email);

  if (!user) {
    return null;
  } else {
    return user;
  }
};
