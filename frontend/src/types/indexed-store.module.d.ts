interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  password: string;
  history: MatchRecords[];
}

interface IUsers {
  users: IUser[];
  addUser: (user: IUser) => void;
  removeUser: (email: string) => void;
  getUserByEmail: (email: string) => IUser | undefined;
}

type IIndexedStore = IUsers;
