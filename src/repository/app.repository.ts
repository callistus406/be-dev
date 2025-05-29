import { dbUsers } from "../db/db.database";

export interface IUser {
    "email": string,
    "gender": string,
    "phone_number": string,
    "age":number,
    
    "id": number,
    "location": {
      "street": string,
      "city": string,
      "state": "string",
      "postcode": number
    },
    "name": string,
    "password": string,
    "first_name": string,
    "last_name": string,
    "title": string,
    "picture": string
}

export class AppRepository {
  static getUsers = () => {
    const users = dbUsers.map((user, idx) => {
      return {
        id: user.id,
        name: user.name,
        age: user.age,
        email: user.email,
        username: user.email,
      };
    });

    return users;
  };

  static addUser = (user: IUser) => {
    //  step1
    dbUsers.push(user);
    // step 2
    const response = dbUsers.find((res) => user.id === res.id);

    return response;
  };

  static getUserById = (id: number) => {
    const response = dbUsers.find((user) => user.id === id);

    return response;
  };

  static getLastUser = () => {
    const lastUser = dbUsers[dbUsers.length - 1];

    return lastUser;
  };

  static getUserByEmail = (email: string) => {
    const user = dbUsers.find((user) => user.email === email);

    if (!user) {
      return null;
    } else {
      return user;
    }
  };


  static getUserLocation = (userId: number) => {
    
    const response = dbUsers.find(item => userId === item.id)
    
    return {
      street: response?.location.street,
      city: response?.location.city,
      postcode: response?.location.postcode,
      state: response?.location.state,
    }
  }




}
