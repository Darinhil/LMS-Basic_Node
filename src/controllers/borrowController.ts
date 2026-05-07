import { Request, Response } from "express";
import { borrowBook } from "../models/borrowModel";

export const createBorrow = async (req: Request, res: Response) => {
  try {
    const { user_id, book_id } = req.body;

    if (!user_id || !book_id) {
      return res.status(400).json({
        message: "user_id and book_id are required",
      });
    }

    const borrowId = await borrowBook({
      user_id,
      book_id,
      status: "borrowed",
    });

    res.status(201).json({
      message: "Book borrowed successfully",
      borrowId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error borrowing book", error });
  }
};
