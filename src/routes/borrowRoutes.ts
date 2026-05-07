import { Router } from "express";
import { createBorrow } from "../controllers/borrowController";

const router = Router();

// Borrow route: POST /borrow
router.post("/", createBorrow);

export default router;
