import { Request, Response } from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  updateBook,
} from "../models/bookModel";

// Controllers receive requests, call models, and send responses.
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Error getting books", error });
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const { title, author, quantity } = req.body;

    if (!title || !author || quantity === undefined) {
      return res.status(400).json({
        message: "title, author, and quantity are required",
      });
    }

    const bookId = await createBook({ title, author, quantity });
    res.status(201).json({ message: "Book created successfully", bookId });
  } catch (error) {
    res.status(500).json({ message: "Error creating book", error });
  }
};

export const editBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, author, quantity } = req.body;

    if (!title || !author || quantity === undefined) {
      return res.status(400).json({
        message: "title, author, and quantity are required",
      });
    }

    const affectedRows = await updateBook(id, { title, author, quantity });

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating book", error });
  }
};

export const removeBook = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const affectedRows = await deleteBook(id);

    if (affectedRows === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting book", error });
  }
};
