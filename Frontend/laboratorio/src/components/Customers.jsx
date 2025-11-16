import React, { useEffect, useState } from "react";
import API from "../utils/api";
import "./Customers.css";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await API.get("/customers");
        setCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching customers:", err);
        setError(err.response?.data?.message || "Error al cargar los clientes");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  if (loading) {
    return (
      <div className="customers-container">
        <div className="loading">Cargando clientes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="customers-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="customers-container">
      <h1>Lista de Clientes</h1>
      
      {customers.length === 0 ? (
        <p className="no-data">No hay clientes registrados</p>
      ) : (
        <div className="table-wrapper">
          <table className="customers-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.address}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="total-count">
        Total de clientes: {customers.length}
      </div>
    </div>
  );
};

export default Customers;