import express from "express";
import bookRoutes from "./routes/bookRoutes";
import borrowRoutes from "./routes/borrowRoutes";

const app = express();

// This middleware allows Express to read JSON data from request bodies.
app.use(express.json());

// Routes decide which controller function should run for each URL.
app.use("/books", bookRoutes);
app.use("/borrow", borrowRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Library Management System API is running",
    endpoints: [
      { method: "GET", path: "/books" },
      { method: "POST", path: "/books" },
      { method: "PUT", path: "/books/:id" },
      { method: "DELETE", path: "/books/:id" },
      { method: "POST", path: "/borrow" },
    ],
  });
});

export default app;
