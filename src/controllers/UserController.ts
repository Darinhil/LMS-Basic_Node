import { Request, Response } from "express";

import { LibraryService } from "../services/libraryService.js";

export class UserController {
  static async createUser(request: Request, response: Response): Promise<void> {
    try {
      const user = await LibraryService.createMember(request.body);
      response.status(201).json(user);
    } catch (error) {
      response.status(400).json({
        message: error instanceof Error ? error.message : "Failed to create member."
      });
    }
  }

  static async getUsers(_request: Request, response: Response): Promise<void> {
    try {
      const users = await LibraryService.getMembers();
      response.json(users);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load members."
      });
    }
  }

  static async createBook(request: Request, response: Response): Promise<void> {
    try {
      const book = await LibraryService.createBook(request.body);
      response.status(201).json(book);
    } catch (error) {
      response.status(400).json({
        message: error instanceof Error ? error.message : "Failed to create book."
      });
    }
  }

  static async getBooks(_request: Request, response: Response): Promise<void> {
    try {
      const books = await LibraryService.getBooks();
      response.json(books);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load books."
      });
    }
  }

  static async borrowBook(request: Request, response: Response): Promise<void> {
    try {
      const borrowRecord = await LibraryService.borrowBook(request.body);
      response.status(201).json(borrowRecord);
    } catch (error) {
      response.status(400).json({
        message: error instanceof Error ? error.message : "Failed to borrow book."
      });
    }
  }

  static async returnBook(request: Request, response: Response): Promise<void> {
    try {
      const borrowId = Number(request.params.borrowId);
      const borrowRecord = await LibraryService.returnBook(borrowId);
      response.json(borrowRecord);
    } catch (error) {
      response.status(400).json({
        message: error instanceof Error ? error.message : "Failed to return book."
      });
    }
  }

  static async getBorrowedBooksReport(_request: Request, response: Response): Promise<void> {
    try {
      const report = await LibraryService.getBorrowedBooksReport();
      response.json(report);
    } catch (error) {
      response.status(500).json({
        message: error instanceof Error ? error.message : "Failed to load report."
      });
    }
  }
}
