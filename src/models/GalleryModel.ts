import { GalleryItem } from "@/classes/GalleryItem.js";
import { AppDataSource } from "@/data-source";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertItem(item: GalleryItem): Promise<void> {
  const itemDb = AppDataSource.getRepository(GalleryItem).create(item);
  await AppDataSource.getRepository(GalleryItem).save(itemDb);
};


export async function getAllItens(): Promise<GalleryItem[]> {
    const books: GalleryItem[] = await AppDataSource.getRepository(GalleryItem).find();
    if (books.length === 0) {
      throw new NotFoundError("No photos found");
    }
    return books;
}

export async function getItemById(id: number): Promise<GalleryItem> {
    const book: GalleryItem | null = await AppDataSource.getRepository(GalleryItem).findOneBy({ id: id });
      if (!book) {
        throw new NotFoundError("No photo found");
      }
      return book;
}

export async function updateItem(id: number, updatedItem: GalleryItem): Promise<void> {
  const bookDb = await AppDataSource.getRepository(GalleryItem).findOneBy({ id: id, });

  if (!bookDb) {
    throw new NotFoundError("No photo found");
  }

  AppDataSource.getRepository(GalleryItem).merge(bookDb, updatedItem);
  await AppDataSource.getRepository(GalleryItem).save(bookDb);
}

export async function deleteItemById(id: number): Promise<void> {
  await AppDataSource.getRepository(GalleryItem).delete(id);
}