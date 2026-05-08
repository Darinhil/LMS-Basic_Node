import dotenv from "dotenv";
import express from "express";

import { initializeDatabase } from "./config/db.js";
import { userRouter } from "./routes/UserRoute.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(express.json());

app.get("/", (_request, response) => {
  response.json({
    message: "Library Management System API is running",
    endpoints: {
      members: "/api/users",
      books: "/api/books",
      borrowBook: "POST /api/borrow",
      returnBook: "PATCH /api/borrow/:borrowId/return",
      reports: "/api/reports/borrowed-books"
    }
  });
});

app.use("/api", userRouter);

const startServer = async (): Promise<void> => {
  try {
    await initializeDatabase();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();
