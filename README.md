# Beginner Library Management System Backend

This is a simple backend project using Node.js, Express.js, TypeScript, MySQL, MVC architecture, and async/await.

## Install Packages

```bash
npm install express mysql2
npm install -D typescript ts-node-dev @types/node @types/express
```

## Run The Project

```bash
npm run dev
```

Build and run compiled JavaScript:

```bash
npm run build
npm start
```

The API runs at:

```text
http://localhost:3000
```

## Connect XAMPP MySQL

1. Open XAMPP Control Panel.
2. Start Apache and MySQL.
3. Click Admin beside MySQL to open phpMyAdmin.
4. Open the SQL tab.
5. Paste the SQL from `database.sql`.
6. Click Go.

The database name is:

```text
library_management
```

The project connects using this beginner-friendly XAMPP default:

```text
host: localhost
user: root
password:
database: library_management
```

## SQL Tables

```sql
CREATE DATABASE IF NOT EXISTS library_management;

USE library_management;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  author VARCHAR(100) NOT NULL,
  quantity INT NOT NULL
);

```

## MVC Structure

```text
src
  config
    db.ts
  controllers
    bookController.ts
  models
    bookModel.ts
  routes
    bookRoutes.ts
  app.ts
  server.ts
```

## API Endpoints

```text
GET    /books
POST   /books
PUT    /books/:id
DELETE /books/:id
```

## Example Requests

Create a book:

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "quantity": 5
}
```

## How The Project Works

`server.ts` starts the server on port 3000.

`app.ts` creates the Express app, enables JSON request bodies, and connects routes.

Routes are the API URLs. For example, `GET /books` calls the book controller.

Controllers handle the request and response. They use `try/catch` so errors return a clear JSON response.

Models contain the MySQL queries. Every database query uses `async/await` with `mysql2/promise`.

`db.ts` creates the MySQL connection pool used by all models.

TypeScript interfaces, such as `Book`, describe what data should look like. This helps beginners see the structure of objects clearly.
