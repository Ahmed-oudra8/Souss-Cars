import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminClients.css";

function AdminClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/admin/clients");

      setClients(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les clients.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-clients">
      <div className="clients-header">
        <div>
          <h2>Gestion des clients</h2>
          <p>Liste des clients inscrits sur SOUSS CARS.</p>
        </div>

        <div className="clients-total">
          <span>Total clients</span>
          <strong>{clients.length}</strong>
        </div>
      </div>

      {loading ? (
        <p className="clients-message">Chargement des clients...</p>
      ) : error ? (
        <p className="clients-error">{error}</p>
      ) : clients.length === 0 ? (
        <p className="clients-message">
          Aucun client inscrit pour le moment.
        </p>
      ) : (
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom complet</th>
                <th>Email</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>

            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>#{client.id}</td>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>
                    {new Date(client.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminClients;