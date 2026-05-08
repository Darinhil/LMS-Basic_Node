import mysql from "mysql2/promise";
const pool = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "library_management_system",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
export const db = pool;
export const initializeDatabase = async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST || "localhost",
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER || "root",
        password: process.env.DB_PASSWORD || ""
    });
    try {
        const databaseName = process.env.DB_NAME || "library_management_system";
        await connection.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
        await connection.query(`USE \`${databaseName}\``);
        await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(120) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        await connection.query(`
      CREATE TABLE IF NOT EXISTS books (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(150) NOT NULL,
        author VARCHAR(100) NOT NULL,
        total_copies INT NOT NULL DEFAULT 1,
        available_copies INT NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
        await connection.query(`
      CREATE TABLE IF NOT EXISTS borrow_records (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        book_id INT NOT NULL,
        borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        return_date TIMESTAMP NULL,
        status ENUM('BORROWED', 'RETURNED') NOT NULL DEFAULT 'BORROWED',
        CONSTRAINT fk_borrow_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT fk_borrow_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
      )
    `);
    }
    finally {
        await connection.end();
    }
};
//# sourceMappingURL=db.js.map