interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  avatar: number|null;
  password: string;
  matchRecords: MatchRecord[];
}

interface IUsers {
  users: IUser[];
  addUser: (user: IUser) => void;
  removeUser: (email: string) => void;
  getUserByEmail: (email: string | null) => IUser | undefined;
  pushMatchRecord: (email: string, matchRecord: MatchRecord) => void;
  resetMatchRecords: (email: string | null) => void;
  checkPassword: (email: string, password: string) => boolean;
}

type IIndexedStore = IUsers;
