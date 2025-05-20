import { ArchiveItem } from "@/classes/ArchiveItem.js";
import { AppDataSource } from "@/data-source";
import { ForeignKeyConstraintError } from "@/Errors/ForeignKeyConstraintError";
import { NotFoundError } from "@/Errors/NotFoundError";
import { QueryFailedError } from "typeorm";

export async function insertItem(item: ArchiveItem): Promise<void> {
  try {
    const itemDB = AppDataSource.getRepository(ArchiveItem).create(item);
    await AppDataSource.getRepository(ArchiveItem).save(itemDB);
  } catch (error) {
    if ((error instanceof QueryFailedError && error.driverError.constraint == "archive_author_id_fkey")) {
      throw new ForeignKeyConstraintError(`Author not exist in DataBase`)
    }
    if ((error instanceof QueryFailedError && error.driverError.constraint == "archive_collection_id_fkey")) {
      throw new ForeignKeyConstraintError(`collection not exist in DataBase`)
    } 
    throw error;
  }
}

export async function getAllItems(): Promise<ArchiveItem[]> {
  const itens: ArchiveItem[] = await AppDataSource.getRepository(ArchiveItem).find();
  if (itens.length === 0) {
    throw new NotFoundError("No items found");
  }
  return itens;
}

export async function getItemById(id: number): Promise<ArchiveItem> {
  const item: ArchiveItem | null = await AppDataSource.getRepository(ArchiveItem).findOneBy({ id: id });
  if (!item) {
    throw new NotFoundError("No item found");
  }
  return item;
}

export async function updateItem(id: number, updatedItem: ArchiveItem): Promise<void> {
  const itemDB = await AppDataSource.getRepository(ArchiveItem).findOneBy({ id: id, });

  if (!itemDB) {
    throw new NotFoundError("No item found");
  }

  AppDataSource.getRepository(ArchiveItem).merge(itemDB, updatedItem);
  await AppDataSource.getRepository(ArchiveItem).save(itemDB);
}

export async function deleteItemById(id: number): Promise<void> {
  await AppDataSource.getRepository(ArchiveItem).delete(id);
}