import { Router } from "express";
import { UserController } from "../controllers/UserController.js";
export const userRouter = Router();
userRouter.post("/users", UserController.createUser);
userRouter.get("/users", UserController.getUsers);
userRouter.post("/books", UserController.createBook);
userRouter.get("/books", UserController.getBooks);
userRouter.post("/borrow", UserController.borrowBook);
userRouter.patch("/borrow/:borrowId/return", UserController.returnBook);
userRouter.get("/reports/borrowed-books", UserController.getBorrowedBooksReport);
//# sourceMappingURL=UserRoute.js.map