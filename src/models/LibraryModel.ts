import { LibraryItem } from "@/classes/LibraryItem.js";
import { AppDataSource } from "@/data-source";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertItem(item: LibraryItem): Promise<void> {
  const itemDb = AppDataSource.getRepository(LibraryItem).create(item);
  await AppDataSource.getRepository(LibraryItem).save(itemDb);
};


export async function getAllItems(): Promise<LibraryItem[]> {
    const books: LibraryItem[] = await AppDataSource.getRepository(LibraryItem).find();
    if (books.length === 0) {
      throw new NotFoundError("No books found");
    }
    return books;
}

export async function getItemById(id: number): Promise<LibraryItem> {
    const book: LibraryItem | null = await AppDataSource.getRepository(LibraryItem).findOneBy({ id: id });
      if (!book) {
        throw new NotFoundError("No book found");
      }
      return book;
}

export async function updateItem(id: number, updatedItem: LibraryItem): Promise<void> {
  const bookDb = await AppDataSource.getRepository(LibraryItem).findOneBy({ id: id, });

  if (!bookDb) {
    throw new NotFoundError("No book found");
  }

  AppDataSource.getRepository(LibraryItem).merge(bookDb, updatedItem);
  await AppDataSource.getRepository(LibraryItem).save(bookDb);
}

export async function deleteItemById(id: number): Promise<void> {
  await AppDataSource.getRepository(LibraryItem).delete(id);
}