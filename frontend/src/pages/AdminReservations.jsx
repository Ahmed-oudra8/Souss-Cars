import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminReservations.css";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/admin/reservations");

      setReservations(response.data.data);
    } catch (error) {
      console.error("Erreur:", error);
      setError("Impossible de charger les réservations.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/reservations/${id}/status`, {
        status: status,
      });

      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status }
            : reservation
        )
      );
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de modifier le statut.");
    }
  };

  if (loading) {
    return <p>Chargement des réservations...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="admin-reservations">

      <div className="reservations-header">
        <h1>Gestion des réservations</h1>
        <p>Consultez et gérez les réservations de vos clients.</p>
      </div>

      <div className="reservations-table-container">

        <table className="reservations-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Téléphone</th>
              <th>Voiture</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Prix total</th>
              <th>Statut</th>
            </tr>
          </thead>

          <tbody>
            {reservations.length === 0 ? (
              <tr>
                <td colSpan="8">
                  Aucune réservation pour le moment.
                </td>
              </tr>
            ) : (
              reservations.map((reservation) => (
                <tr key={reservation.id}>

                  <td>#{reservation.id}</td>

                  <td>{reservation.customer_name}</td>

                  <td>{reservation.phone}</td>

                  <td>
                    {reservation.car?.name || "Voiture inconnue"}
                  </td>

                  <td>{reservation.start_date}</td>

                  <td>{reservation.end_date}</td>

                  <td>
                    {reservation.total_price} DH
                  </td>

                  <td>
                    <select
                      className={`reservation-status ${reservation.status}`}
                      value={reservation.status}
                      onChange={(e) =>
                        updateStatus(reservation.id, e.target.value)
                      }
                    >
                      <option value="pending">En attente</option>
                      <option value="confirmed">Confirmée</option>
                      <option value="cancelled">Annulée</option>
                    </select>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default AdminReservations;