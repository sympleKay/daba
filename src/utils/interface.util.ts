export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  bio: string;
  _id?: string;
  photo?: string;
  fullName?: string;
  lastLogin?: Date;
  createdAt?: Date;
  deletedAt?: Date;
}

export interface UserLoginInterface {
  email: string;
  password: string;
}

export interface AuthUserInterface {
  id: string;
  email: string;
}

export enum NodeEnv {
  PRODUCTION = "production",
  DEVELOPMENT = "development",
  STAGING = "staging",
}
