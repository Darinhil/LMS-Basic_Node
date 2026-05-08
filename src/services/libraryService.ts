import { BookModel } from "../models/BookModel.js";
import { BorrowModel } from "../models/BorrowModel.js";
import { UserModel } from "../models/UserModel.js";
import { BorrowBookInput, CreateBookInput, CreateUserInput } from "../types/library.js";

export class LibraryService {
  static async createMember(payload: CreateUserInput) {
    if (!payload.name || !payload.email) {
      throw new Error("Name and email are required.");
    }

    return UserModel.createUser(payload);
  }

  static async getMembers() {
    return UserModel.getAllUsers();
  }

  static async createBook(payload: CreateBookInput) {
    if (!payload.title || !payload.author) {
      throw new Error("Title and author are required.");
    }

    if (payload.totalCopies < 1) {
      throw new Error("Total copies must be at least 1.");
    }

    return BookModel.createBook(payload);
  }

  static async getBooks() {
    return BookModel.getAllBooks();
  }

  static async borrowBook(payload: BorrowBookInput) {
    const user = await UserModel.findUserById(payload.userId);
    if (!user) {
      throw new Error("Member not found.");
    }

    const book = await BookModel.findBookById(payload.bookId);
    if (!book) {
      throw new Error("Book not found.");
    }

    if (book.available_copies < 1) {
      throw new Error("This book is not available right now.");
    }

    const existingBorrow = await BorrowModel.findActiveBorrowByUserAndBook(payload.userId, payload.bookId);
    if (existingBorrow) {
      throw new Error("This member already borrowed this book and has not returned it yet.");
    }

    await BookModel.decreaseAvailableCopies(payload.bookId);

    return BorrowModel.createBorrowRecord(payload.userId, payload.bookId);
  }

  static async returnBook(borrowId: number) {
    const borrowRecord = await BorrowModel.findBorrowRecordById(borrowId);
    if (!borrowRecord) {
      throw new Error("Borrow record not found.");
    }

    if (borrowRecord.status === "RETURNED") {
      throw new Error("This book was already returned.");
    }

    await BorrowModel.returnBook(borrowId);
    await BookModel.increaseAvailableCopies(borrowRecord.book_id);

    return BorrowModel.findBorrowRecordById(borrowId);
  }

  static async getBorrowedBooksReport() {
    return BorrowModel.getBorrowedBooksReport();
  }
}
