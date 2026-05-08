import { ResultSetHeader, RowDataPacket } from "mysql2";

import { db } from "../config/db.js";
import { CreateUserInput, User } from "../types/library.js";

export class UserModel {
  static async createUser(user: CreateUserInput): Promise<User> {
    const [result] = await db.execute<ResultSetHeader>(
      "INSERT INTO users (name, email) VALUES (?, ?)",
      [user.name, user.email]
    );

    const createdUser = await this.findUserById(result.insertId);

    if (!createdUser) {
      throw new Error("User was created but could not be loaded.");
    }

    return createdUser;
  }

  static async getAllUsers(): Promise<User[]> {
    const [rows] = await db.execute<(User & RowDataPacket)[]>(
      "SELECT id, name, email, created_at FROM users ORDER BY id DESC"
    );

    return rows;
  }

  static async findUserById(id: number): Promise<User | null> {
    const [rows] = await db.execute<(User & RowDataPacket)[]>(
      "SELECT id, name, email, created_at FROM users WHERE id = ?",
      [id]
    );

    return rows[0] ?? null;
  }
}
