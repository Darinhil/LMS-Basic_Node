import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "../config/db.js";
import { Book, CreateBookInput } from "../types/library.js";

export class BookModel {
  static async createBook(book: CreateBookInput): Promise<Book> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO books (title, author, total_copies, available_copies) VALUES (?, ?, ?, ?)",
      [book.title, book.author, book.totalCopies, book.totalCopies]
    );

    const createdBook = await this.findBookById(result.insertId);

    if (!createdBook) {
      throw new Error("Book was created but could not be loaded.");
    }

    return createdBook;
  }

  static async getAllBooks(): Promise<Book[]> {
    const [rows] = await db.execute<(Book & RowDataPacket)[]>(
      "SELECT id, title, author, total_copies, available_copies, created_at FROM books ORDER BY id DESC"
    );

    return rows;
  }

  static async findBookById(id: number): Promise<Book | null> {
    const [rows] = await db.execute<(Book & RowDataPacket)[]>(
      "SELECT id, title, author, total_copies, available_copies, created_at FROM books WHERE id = ?",
      [id]
    );

    return rows[0] ?? null;
  }

  static async decreaseAvailableCopies(bookId: number): Promise<void> {
    await db.execute(
      "UPDATE books SET available_copies = available_copies - 1 WHERE id = ? AND available_copies > 0",
      [bookId]
    );
  }

  static async increaseAvailableCopies(bookId: number): Promise<void> {
    await db.execute(
      "UPDATE books SET available_copies = available_copies + 1 WHERE id = ?",
      [bookId]
    );
  }
}
