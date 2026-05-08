export interface User {
  id: number;
  name: string;
  email: string;
  created_at: Date;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  total_copies: number;
  available_copies: number;
  created_at: Date;
}

export interface BorrowRecord {
  id: number;
  user_id: number;
  book_id: number;
  borrow_date: Date;
  return_date: Date | null;
  status: "BORROWED" | "RETURNED";
}

export interface CreateUserInput {
  name: string;
  email: string;
}

export interface CreateBookInput {
  title: string;
  author: string;
  totalCopies: number;
}

export interface BorrowBookInput {
  userId: number;
  bookId: number;
}
