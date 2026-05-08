# Library Management System

This is a small **Library Management System** built with:

- Node.js
- TypeScript
- Express
- MySQL
- `async/await`

## Project structure

```text
src/
  config/        -> database connection
  controllers/   -> handle request and response
  models/        -> query MySQL tables
  routes/        -> API endpoints
  services/      -> business logic
  types/         -> TypeScript interfaces
  server.ts      -> app entry point
```

## Features

- Add library members
- View all members
- Add books
- View all books
- Borrow a book
- Return a book
- View borrowed books report

## How `async/await` is used

This project uses `async/await` for database work.

Example:

```ts
static async getBooks() {
  return BookModel.getAllBooks();
}
```

- `async` means the function returns a Promise.
- `await` waits for MySQL to finish before going to the next line.
- This makes code easier to read than many nested callbacks.

## Setup

1. Create a MySQL database connection in `.env`
2. Copy `.env.example` to `.env`
3. Update your MySQL username and password
4. Install packages:

```bash
npm install
```

5. Start development server:

```bash
npm run dev
```

The app will create the database and tables automatically.

## API endpoints

### Create member

```http
POST /api/users
Content-Type: application/json
```

```json
{
  "name": "Dara",
  "email": "dara@example.com"
}
```

### Create book

```http
POST /api/books
Content-Type: application/json
```

```json
{
  "title": "Node.js Basics",
  "author": "John Smith",
  "totalCopies": 5
}
```

### Borrow book

```http
POST /api/borrow
Content-Type: application/json
```

```json
{
  "userId": 1,
  "bookId": 1
}
```

### Return book

```http
PATCH /api/borrow/1/return
```

## Notes

- `users` table stores members
- `books` table stores books
- `borrow_records` table stores borrow and return history
- `available_copies` changes when a book is borrowed or returned
