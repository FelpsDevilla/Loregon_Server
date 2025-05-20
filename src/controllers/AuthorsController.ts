import { plainToInstance } from "class-transformer";
import { Request, Response } from "express";
import { Author } from "@/classes/Author.js";
import { deleteAuthorById, getAllAuthors, getAuthorById, insertAuthor, updateAuthor } from "@/models/AuthorModel.js";
import { NotFoundError } from "@/Errors/NotFoundError";

export async function insertAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const author: Author = plainToInstance(Author, req.body as Author);
    await insertAuthor(author);
    res.status(201).json({ message: "Author created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAllAuthorsRequest(_: Request, res: Response): Promise<void> {
  try {
    const authors = await getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function getAuthorByIdRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    const author = await getAuthorById(id);
    res.status(200).json(author);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function updateAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const updatedAuthor: Author = plainToInstance(Author, req.body as Author);
    const id = Number(req.params.id);

    await updateAuthor(id, updatedAuthor);
    res.status(200).json({ message: `Author with ID ${id} updated successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Unexpected server error." });
  }
}

export async function deleteAuthorRequest(req: Request, res: Response): Promise<void> {
  try {
    const id = Number(req.params.id);
    await deleteAuthorById(id);

    res.status(200).json({ message: `Author with ID ${id} deleted successfully.` });
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Unexpected server error." });
  }
}
