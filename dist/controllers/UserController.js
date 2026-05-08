import { LibraryService } from "../services/libraryService.js";
export class UserController {
    static async createUser(request, response) {
        try {
            const user = await LibraryService.createMember(request.body);
            response.status(201).json(user);
        }
        catch (error) {
            response.status(400).json({
                message: error instanceof Error ? error.message : "Failed to create member."
            });
        }
    }
    static async getUsers(_request, response) {
        try {
            const users = await LibraryService.getMembers();
            response.json(users);
        }
        catch (error) {
            response.status(500).json({
                message: error instanceof Error ? error.message : "Failed to load members."
            });
        }
    }
    static async createBook(request, response) {
        try {
            const book = await LibraryService.createBook(request.body);
            response.status(201).json(book);
        }
        catch (error) {
            response.status(400).json({
                message: error instanceof Error ? error.message : "Failed to create book."
            });
        }
    }
    static async getBooks(_request, response) {
        try {
            const books = await LibraryService.getBooks();
            response.json(books);
        }
        catch (error) {
            response.status(500).json({
                message: error instanceof Error ? error.message : "Failed to load books."
            });
        }
    }
    static async borrowBook(request, response) {
        try {
            const borrowRecord = await LibraryService.borrowBook(request.body);
            response.status(201).json(borrowRecord);
        }
        catch (error) {
            response.status(400).json({
                message: error instanceof Error ? error.message : "Failed to borrow book."
            });
        }
    }
    static async returnBook(request, response) {
        try {
            const borrowId = Number(request.params.borrowId);
            const borrowRecord = await LibraryService.returnBook(borrowId);
            response.json(borrowRecord);
        }
        catch (error) {
            response.status(400).json({
                message: error instanceof Error ? error.message : "Failed to return book."
            });
        }
    }
    static async getBorrowedBooksReport(_request, response) {
        try {
            const report = await LibraryService.getBorrowedBooksReport();
            response.json(report);
        }
        catch (error) {
            response.status(500).json({
                message: error instanceof Error ? error.message : "Failed to load report."
            });
        }
    }
}
//# sourceMappingURL=UserController.js.map