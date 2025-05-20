import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { ArchiveItem } from "@/classes/ArchiveItem.js";
import { deleteItemById, getAllItems, getItemById, insertItem, updateItem } from "@/models/ArchiveModel.js";
import { ForeignKeyConstraintError } from "@/Errors/ForeignKeyConstraintError";
import { NotFoundError } from "@/Errors/NotFoundError";
import { config } from "@/config/config";
import fs from "fs";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: ArchiveItem = plainToInstance(ArchiveItem, req.body);
    item.imageFileName = req.file?.filename as string;
    await insertItem(item);
    res.status(201).json({message: "Item added successfully!"});
  } catch (error) {
    if (error instanceof ForeignKeyConstraintError) {
      res.status(400).json({ message: error.message});
    }
    console.error("Insert Archive Item Error:", error);
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
      return
    }
    console.error(error);
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
      return
    }
    console.error(error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: ArchiveItem = plainToInstance(ArchiveItem, req.body as ArchiveItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).json({ message: `Archive item with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return
    }
    console.error(error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);
    const imagePath = `${config.filesPath.archiveImages}/${item.imageFileName}`;
    fs.rmSync(imagePath);
    await deleteItemById(id);
    res.status(200).json({ message: `Archive item with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return
    }
    console.error(error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}
