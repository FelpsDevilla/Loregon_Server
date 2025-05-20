import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { LibraryItem } from "@/classes/LibraryItem.js";
import { deleteItemById, getAllItems, getItemById, insertItem, updateItem } from "@/models/LibraryModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";
import { config } from "@/config/config";
import fs from "fs";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: LibraryItem = plainToInstance(LibraryItem, req.body as LibraryItem);
    const files = req.files as Record<string, Express.Multer.File[]>;
    item.imageFileName = files.image[0].filename as string;
    item.bookFileName = files.book[0].filename as string;
    await insertItem(item);
    res.status(201).json({ message: "Library item created successfully." });
  } catch (error) {
    console.error("Insert Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllItemsRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItems();
    res.status(200).json(items);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get All Library Items Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getItemByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);
    res.status(200).json(item);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get Library Item By ID Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: LibraryItem = plainToInstance(LibraryItem, req.body as LibraryItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).json({ message: `Library item with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Update Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);
    const imagePath = `${config.filesPath.libraryBooks}/${item.imageFileName}`;
    const bookPath = `${config.filesPath.libraryBooks}/${item.bookFileName}`;
    fs.rmSync(imagePath);
    fs.rmSync(bookPath);
    await deleteItemById(id);
    res.status(200).json({ message: `Library item with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete Library Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}