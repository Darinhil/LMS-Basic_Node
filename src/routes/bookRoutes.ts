import { Router } from "express";
import {
  addBook,
  editBook,
  getBooks,
  removeBook,
} from "../controllers/bookController";

const router = Router();

// Book routes map HTTP methods and URLs to controller functions.
router.get("/", getBooks);
router.post("/", addBook);
router.put("/:id", editBook);
router.delete("/:id", removeBook);

export default router;
