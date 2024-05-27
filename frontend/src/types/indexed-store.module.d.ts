interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password: string;
}

interface IUsers {
  users: IUser[];
  addUser: (user: IUser) => void;
  removeUser: (email: string) => void;
}

type IIndexedStore = IUsers;
