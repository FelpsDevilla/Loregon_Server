import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { User } from "@/classes/User.js";
import { deleteUserById, getAllUsers, getUserById, insertUser, updateUser } from "@/models/UserModel.js";
import bcrypt from "bcryptjs";
import { NotFoundError } from "@/Errors/NotFoundError";
import { UniqueConstraintError } from "@/Errors/UniqueConstraintError";

export async function insertUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const user: User = plainToInstance(User, req.body as User);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    await insertUser(user);

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      res.status(409).json({ message: error.message });
      return;
    }
    console.error("Insert User Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllUsersRequest(_: Request, res: Response): Promise<void> {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Failed to fetch users." });
  }
}

export async function getUserByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get User By ID Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedUser: User = plainToInstance(User, req.body as User);
    const id = Number(req.params.id);

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(updatedUser.password, salt);
    updatedUser.password = hash;

    await updateUser(id, updatedUser);
    res.status(200).json({ message: `User with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteUserRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteUserById(id);
    res.status(200).json({ message: `User with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}