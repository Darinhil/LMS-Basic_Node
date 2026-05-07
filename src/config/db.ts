import mysql from "mysql2/promise";

// This file creates one shared MySQL connection pool for the whole project.
// XAMPP MySQL usually uses user "root" and an empty password by default.
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "library_management",
  waitForConnections: true,
  connectionLimit: 10,
});
