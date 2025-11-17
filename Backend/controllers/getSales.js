import { pool } from "../data/conection.js";

export const getSales = (request, response) => {
  pool.query('SELECT s.id, s.amount, s.created_at, c.name FROM sales AS s JOIN customers AS c ON s.id_customer = c.id', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
  });
};

export const getSalesReport = async (request, response) => {
    try {
        const result = await pool.query(
            `SELECT c.name, SUM(s.amount) 'Total Sales' FROM sales AS s JOIN customers AS c ON s.id_customer = c.id GROUP BY c.name`
        );

        response.status(200).json(result.rows);
    } catch (error) {
        console.error("Error fetching sales report:", error);
        response.status(500).json({ error: "Error fetching sales report" });
    }
};