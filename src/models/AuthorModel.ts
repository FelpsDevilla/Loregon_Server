import { Author } from "@/classes/Author.js";
import { AppDataSource } from "@/data-source";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertAuthor(author: Author): Promise<void> {
  const authorDb = AppDataSource.getRepository(Author).create(author);
  await AppDataSource.getRepository(Author).save(authorDb);
}

export async function getAllAuthors(): Promise<Author[]> {
  const authors: Author[] = await AppDataSource.getRepository(Author).find();
  if (authors.length === 0) {
    throw new NotFoundError("No authors found");
  }
  return authors;
}

export async function getAuthorById(id: number): Promise<Author> {
  const author: Author | null = await AppDataSource.getRepository(Author).findOneBy({ id: id });
  if (!author) {
    throw new NotFoundError("No author found");
  }
  return author;
}

export async function updateAuthor(id: number, authorUpdated: Author): Promise<void> {
  const authorDb = await AppDataSource.getRepository(Author).findOneBy({ id: id, });

  if (!authorDb) {
    throw new NotFoundError("No author found");
  }

  AppDataSource.getRepository(Author).merge(authorDb, authorUpdated);
  await AppDataSource.getRepository(Author).save(authorDb);
}

export async function deleteAuthorById(id: number): Promise<void> {
  await getAuthorById(id);
  await AppDataSource.getRepository(Author).delete(id);
}