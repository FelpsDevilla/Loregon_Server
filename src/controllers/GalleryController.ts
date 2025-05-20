import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { GalleryItem } from "@/classes/GalleryItem.js";
import { deleteItemById, getAllItens, getItemById, insertItem, updateItem } from "@/models/GalleryModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";
import { config } from "@/config/config";
import fs from "fs";

export async function insertItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const item: GalleryItem = plainToInstance(GalleryItem, req.body as GalleryItem);
    item.imageFileName = req.file?.filename as string;
    await insertItem(item);

    res.status(201).json({ message: "Gallery item created successfully." });
  } catch (error) {
    console.error("Insert Gallery Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllItensRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllItens();
    res.status(200).json(items);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get All Gallery Items Error:", error);
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
    console.error("Get Gallery Item By ID Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedItem: GalleryItem = plainToInstance(GalleryItem, req.body as GalleryItem);
    const id = Number(req.params.id);

    await updateItem(id, updatedItem);
    res.status(200).json({ message: `Gallery item with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Update Gallery Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteItemRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getItemById(id);
    const imagePath = `${config.filesPath.galleryImages}/${item.imageFileName}`;
    fs.rmSync(imagePath);
    await deleteItemById(id);
    res.status(200).json({ message: `Gallery item with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete Gallery Item Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}
