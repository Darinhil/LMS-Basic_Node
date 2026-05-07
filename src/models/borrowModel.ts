import { ResultSetHeader } from "mysql2";
import { db } from "../config/db";

export interface BorrowBook {
  id?: number;
  user_id: number;
  book_id: number;
  status?: string;
}

export const borrowBook = async (borrow: BorrowBook): Promise<number> => {
  const [result] = await db.query<ResultSetHeader>(
    "INSERT INTO borrow_books (user_id, book_id, status) VALUES (?, ?, ?)",
    [borrow.user_id, borrow.book_id, borrow.status || "borrowed"]
  );

  return result.insertId;
};
