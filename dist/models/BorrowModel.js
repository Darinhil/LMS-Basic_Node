import { db } from "../config/db.js";
export class BorrowModel {
    static async createBorrowRecord(userId, bookId) {
        const [result] = await db.execute("INSERT INTO borrow_records (user_id, book_id) VALUES (?, ?)", [userId, bookId]);
        const record = await this.findBorrowRecordById(result.insertId);
        if (!record) {
            throw new Error("Borrow record was created but could not be loaded.");
        }
        return record;
    }
    static async findBorrowRecordById(id) {
        const [rows] = await db.execute("SELECT id, user_id, book_id, borrow_date, return_date, status FROM borrow_records WHERE id = ?", [id]);
        return rows[0] ?? null;
    }
    static async findActiveBorrowByUserAndBook(userId, bookId) {
        const [rows] = await db.execute("SELECT id, user_id, book_id, borrow_date, return_date, status FROM borrow_records WHERE user_id = ? AND book_id = ? AND status = 'BORROWED' LIMIT 1", [userId, bookId]);
        return rows[0] ?? null;
    }
    static async returnBook(borrowId) {
        await db.execute("UPDATE borrow_records SET status = 'RETURNED', return_date = CURRENT_TIMESTAMP WHERE id = ? AND status = 'BORROWED'", [borrowId]);
    }
    static async getBorrowedBooksReport() {
        const [rows] = await db.execute(`
      SELECT
        br.id AS borrow_id,
        u.name AS member_name,
        u.email AS member_email,
        b.title AS book_title,
        b.author AS book_author,
        br.borrow_date,
        br.return_date,
        br.status
      FROM borrow_records br
      INNER JOIN users u ON u.id = br.user_id
      INNER JOIN books b ON b.id = br.book_id
      ORDER BY br.id DESC
    `);
        return rows;
    }
}
//# sourceMappingURL=BorrowModel.js.map