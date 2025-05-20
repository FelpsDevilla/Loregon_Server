import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Collection } from "@/classes/Collection.js";
import { deleteCollectionById, getAllCollections, getCollectionById, insertCollection, updateCollection } from "@/models/CollectionModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const collection: Collection = plainToInstance(Collection, req.body as Collection);
    await insertCollection(collection);
    res.status(201).json({ message: "Collection created successfully." });
  } catch (error) {
    console.error("Insert Collection Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllCollectionsRequest(_: Request, res: Response): Promise<void> {
  try {
    const items = await getAllCollections();
    res.status(200).json(items);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get All Collections Error:", error);
    res.status(500).json({ message: "Failed to fetch collections." });
  }
}

export async function getCollectionByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const item = await getCollectionById(id);
    res.status(200).json(item);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Get Collection By ID Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedCollection: Collection = plainToInstance(Collection, req.body as Collection);
    const id = Number(req.params.id);

    await updateCollection(id, updatedCollection);
    res.status(200).json({ message: `Collection with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Update Collection Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteCollectionRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteCollectionById(id);
    res.status(200).json({ message: `Collection with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    console.error("Delete Collection Error:", error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}
