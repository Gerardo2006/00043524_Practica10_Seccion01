import { pool } from "../data/conection.js";

export const getSales = (request, response) => {
  pool.query('SELECT * FROM sales', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
  });
};