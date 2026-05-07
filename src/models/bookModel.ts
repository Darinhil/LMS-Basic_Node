import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db";

// A TypeScript interface describes the shape of a book object.
export interface Book {
  id?: number;
  title: string;
  author: string;
  quantity: number;
}

export interface BookRow extends RowDataPacket, Book {
  id: number;
}

// Models contain database queries. async/await keeps the code easy to read.
export const getAllBooks = async (): Promise<BookRow[]> => {
  const [rows] = await db.query<BookRow[]>("SELECT * FROM books");
  return rows;
};

export const createBook = async (book: Book): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO books (title, author, quantity) VALUES (?, ?, ?)",
    [book.title, book.author, book.quantity]
  );

  return result.insertId;
};

export const updateBook = async (
  id: number,
  book: Book
): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "UPDATE books SET title = ?, author = ?, quantity = ? WHERE id = ?",
    [book.title, book.author, book.quantity, id]
  );

  return result.affectedRows;
};

export const deleteBook = async (id: number): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "DELETE FROM books WHERE id = ?",
    [id]
  );

  return result.affectedRows;
};
