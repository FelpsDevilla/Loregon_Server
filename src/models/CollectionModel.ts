import { Collection } from "@/classes/Collection";
import { AppDataSource } from "@/data-source";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertCollection(collection: Collection): Promise<void> {
  const collectionDB = AppDataSource.getRepository(Collection).create(collection);
  await AppDataSource.getRepository(Collection).save(collectionDB);
};

export async function getAllCollections(): Promise<Collection[]> {
  const collections: Collection[] = await AppDataSource.getRepository(Collection).find();
  if (collections.length === 0) {
    throw new NotFoundError("No collections found");
  }
  return collections;
}

export async function getCollectionById(id: number): Promise<Collection> {
  const collection: Collection | null = await AppDataSource.getRepository(Collection).findOneBy({ id: id });
  if (!collection) {
    throw new NotFoundError("No collection found");
  }
  return collection;
}

export async function updateCollection(id: number, updateCollection: Collection): Promise<void> {
  const collectionDb = await AppDataSource.getRepository(Collection).findOneBy({ id: id, });
  
  if (!collectionDb) {
    throw new NotFoundError("Collection not found");
  }

  AppDataSource.getRepository(Collection).merge(collectionDb, updateCollection);
  await AppDataSource.getRepository(Collection).save(collectionDb);
}

export async function deleteCollectionById(id: number): Promise<void> {
  await getCollectionById(id);
  await AppDataSource.getRepository(Collection).delete(id);
}