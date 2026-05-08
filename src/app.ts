import express from "express";
import bookRoutes from "./routes/bookRoutes";

const app = express();

// This middleware allows Express to read JSON data from request bodies.
app.use(express.json());

// Routes decide which controller function should run for each URL.
app.use("/books", bookRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Library Management System API is running",
    endpoints: [
      { message: "Get all books", method: "GET", path: "/books" },
      { message: "Create a new book", method: "POST", path: "/books" },
      { message: "Update a book by ID", method: "PUT", path: "/books/:id" },
      { message: "Delete a book by ID", method: "DELETE", path: "/books/:id" },
    ],
  });
});

export default app;
