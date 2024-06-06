import { User } from "../entities/user-entity";

export interface UserInterface {
  getUsers(): Promise<User[]>;
  createUser(userData: User): Promise<User>;
  deleteAllUser(): Promise<boolean>;
  fetchUserWithEmail(email: string): Promise<User | boolean>;
}
