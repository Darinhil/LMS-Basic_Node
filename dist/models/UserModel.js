import { db } from "../config/db.js";
export class UserModel {
    static async createUser(user) {
        const [result] = await db.execute("INSERT INTO users (name, email) VALUES (?, ?)", [user.name, user.email]);
        const createdUser = await this.findUserById(result.insertId);
        if (!createdUser) {
            throw new Error("User was created but could not be loaded.");
        }
        return createdUser;
    }
    static async getAllUsers() {
        const [rows] = await db.execute("SELECT id, name, email, created_at FROM users ORDER BY id DESC");
        return rows;
    }
    static async findUserById(id) {
        const [rows] = await db.execute("SELECT id, name, email, created_at FROM users WHERE id = ?", [id]);
        return rows[0] ?? null;
    }
}
//# sourceMappingURL=UserModel.js.map