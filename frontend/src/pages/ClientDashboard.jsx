import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./ClientDashboard.css";

function ClientDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("souss_token");
    const role = localStorage.getItem("souss_role");
    const savedUser = localStorage.getItem("souss_user");

    if (!token || role !== "client") {
      navigate("/login");
      return;
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    fetchReservations();
  }, [navigate]);

  const fetchReservations = async () => {
    try {
      const response = await api.get("/reservations");
      setReservations(response.data.data || []);
    } catch (error) {
      console.error("Erreur réservations:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }

    localStorage.removeItem("souss_token");
    localStorage.removeItem("souss_role");
    localStorage.removeItem("souss_user");

    navigate("/");
  };

  if (!user) {
    return <div className="client-loading">Chargement...</div>;
  }

  return (
    <div className="client-page">

      {/* HERO */}
      <section className="client-hero">
        <div className="client-hero-content">
          <span>VOTRE ESPACE PERSONNEL</span>

          <h1>
            Bienvenue, {user.name} !
          </h1>

          <p>
            Heureux de vous retrouver chez SOUSS CARS.
            Découvrez nos voitures et préparez votre prochain voyage.
          </p>

          <button onClick={() => navigate("/cars")}>
            Découvrir nos voitures
          </button>
        </div>
      </section>

      {/* PROFILE */}
      <section className="client-profile">
        <div className="client-section-heading">
          <span>MON COMPTE</span>
          <h2>Mes informations personnelles</h2>
        </div>

        <div className="client-profile-card">
          <div className="client-profile-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>

          <div className="client-profile-info">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <span>Client SOUSS CARS</span>
          </div>

          <button onClick={logout}>
            Déconnexion
          </button>
        </div>
      </section>

      {/* RESERVATIONS */}
      <section className="client-reservations">
        <div className="client-section-heading">
          <span>MON ACTIVITÉ</span>
          <h2>Mes réservations</h2>
          <p>Retrouvez ici vos demandes de réservation.</p>
        </div>

        {loading ? (
          <p className="client-empty">Chargement des réservations...</p>
        ) : reservations.length === 0 ? (
          <div className="client-empty">
            <i className="fas fa-calendar-alt"></i>
            <h3>Aucune réservation pour le moment</h3>
            <p>Découvrez nos voitures et réservez votre prochain véhicule.</p>

            <button onClick={() => navigate("/cars")}>
              Voir les voitures
            </button>
          </div>
        ) : (
          <div className="client-reservation-list">
            {reservations.map((reservation) => (
              <div className="client-reservation-card" key={reservation.id}>
                <div>
                  <h3>
                    {reservation.car?.name || "Réservation"}
                  </h3>

                  <p>
                    Du {reservation.start_date} au {reservation.end_date}
                  </p>

                  <strong>
                    {reservation.total_price} DH
                  </strong>
                </div>

                <span className={`reservation-status ${reservation.status}`}>
                  {reservation.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CALL TO ACTION */}
      <section className="client-cta">
        <h2>Prêt pour votre prochain voyage ?</h2>
        <p>Choisissez votre voiture parmi notre sélection.</p>

        <button onClick={() => navigate("/cars")}>
          Explorer nos voitures
        </button>
      </section>

    </div>
  );
}

export default ClientDashboard;