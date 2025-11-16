import { pool } from "../data/conection.js";

export const getCustomers = (request, response) => {
  pool.query('SELECT * FROM customers', (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    })
}

export const getCustomerByCode = (request, response) => {
  const code = request.params.code;
  pool.query('SELECT * FROM customers WHERE code = $1', [code], (error, results) => {
    if (error) {
        throw error;
    }
    response.status(200).json(results.rows);
    })
}