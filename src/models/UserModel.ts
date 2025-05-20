import { User } from "@/classes/User";
import { AppDataSource } from "@/data-source";
import { NotFoundError } from "@/Errors/NotFoundError";
import { UniqueConstraintError } from "@/Errors/UniqueConstraintError";
import { QueryFailedError } from "typeorm";

export async function insertUser(user: User): Promise<void> {
  try {
    const userDb = AppDataSource.getRepository(User).create(user);
    await AppDataSource.getRepository(User).save(userDb);
  } catch (error) {
    if ((error instanceof QueryFailedError && error.driverError.constraint == "users_cpf_key")) {
      throw new UniqueConstraintError(`Cpf already registered`)
    }
  }
};

export async function getAllUsers(): Promise<User[]> {
  const users: User[] = await AppDataSource.getRepository(User).find();
  if (users.length === 0) {
    throw new NotFoundError("No users found");
  }
  return users;
}

export async function getUserById(id: number): Promise<User> {
  const user: User | null = await AppDataSource.getRepository(User).findOneBy({ id: id });
  if (!user) {
    throw new NotFoundError("No user found");
  }
  return user;
}

export async function getUserBycpf(cpf: string): Promise<User> {
  const user: User | null = await AppDataSource.getRepository(User).findOneBy({ cpf: cpf });
  if (!user) {
    throw new NotFoundError("No user found");
  }
  return user;
}

export async function updateUser(id: number, updatedUser: User): Promise<void> {
  const userDb = await AppDataSource.getRepository(User).findOneBy({ id: id, });

  if (!userDb) {
    throw new NotFoundError("No user found");
  }

  AppDataSource.getRepository(User).merge(userDb, updatedUser);
  await AppDataSource.getRepository(User).save(userDb);
}

export async function deleteUserById(id: number): Promise<void> {
  await getUserById(id);
  await AppDataSource.getRepository(User).delete(id);
}