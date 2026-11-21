
import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

import AdminCars from "./AdminCars";
import AdminReservations from "./AdminReservations";
import AdminMessages from "./AdminMessages";
import AdminClients from "./AdminClients";

function AdminDashboard() {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    cars: 0,
    reservations: 0,
    clients: 0,
    pending_reservations: 0,
    confirmed_reservations: 0,
    cancelled_reservations: 0,
  });

  // VERIFICATION ADMIN
  useEffect(() => {
    const role = localStorage.getItem("souss_role");
    const token = localStorage.getItem("souss_token");

    if (!token || role !== "admin") {
      navigate("/login");
      return;
    }

    fetchStats();
  }, [navigate]);

  // FETCH STATISTICS
  const fetchStats = async () => {
    try {
      const response = await api.get("/admin/dashboard/stats");
      setStats(response.data.data);
    } catch (error) {
      console.error("Erreur statistiques:", error);
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.post("/admin/logout");
    } catch (error) {
      console.error("Erreur déconnexion:", error);
    }

    localStorage.removeItem("souss_token");
    localStorage.removeItem("souss_role");
    localStorage.removeItem("souss_user");

    navigate("/login");
  };

  return (
    <div className="admin-dashboard">

      {/* SIDEBAR */}
      <aside className="admin-sidebar">

        <h2>SOUSS CARS</h2>
        <p>Administration</p>

        <nav>

          <button
            className={activePage === "dashboard" ? "active" : ""}
            onClick={() => setActivePage("dashboard")}
          >
            Dashboard
          </button>

          <button
            className={activePage === "cars" ? "active" : ""}
            onClick={() => setActivePage("cars")}
          >
            Gestion des voitures
          </button>

          <button
            className={activePage === "reservations" ? "active" : ""}
            onClick={() => setActivePage("reservations")}
          >
            Réservations
          </button>

          <button
            className={activePage === "messages" ? "active" : ""}
            onClick={() => setActivePage("messages")}
          >
            Messages
          </button>

          <button
            className={activePage === "clients" ? "active" : ""}
            onClick={() => setActivePage("clients")}
          >
            Clients
          </button>

        </nav>

        <button onClick={logout}>
          Déconnexion
        </button>

      </aside>

      {/* MAIN CONTENT */}
      <main className="admin-content">

        {/* DASHBOARD */}
        {activePage === "dashboard" && (
          <>

            <header>
              <h1>Dashboard</h1>
              <p>
                Bienvenue dans votre espace d'administration.
              </p>
            </header>

            <section className="admin-stats">

              <div className="stat-card">
                <h3>Voitures</h3>
                <strong>
                  {loading ? "..." : stats.cars}
                </strong>
              </div>

              <div className="stat-card">
                <h3>Réservations</h3>
                <strong>
                  {loading ? "..." : stats.reservations}
                </strong>
              </div>

              <div className="stat-card">
                <h3>Clients</h3>
                <strong>
                  {loading ? "..." : stats.clients}
                </strong>
              </div>

              <div className="stat-card">
                <h3>En attente</h3>
                <strong>
                  {loading ? "..." : stats.pending_reservations}
                </strong>
              </div>

              <div className="stat-card">
                <h3>Confirmées</h3>
                <strong>
                  {loading ? "..." : stats.confirmed_reservations}
                </strong>
              </div>

              <div className="stat-card">
                <h3>Annulées</h3>
                <strong>
                  {loading ? "..." : stats.cancelled_reservations}
                </strong>
              </div>

            </section>

            <section className="admin-welcome">
              <h2>Gestion de votre agence</h2>

              <p>
                Gérez vos voitures et suivez les activités
                de votre agence SOUSS CARS.
              </p>
            </section>

          </>
        )}

        {/* CARS */}
        {activePage === "cars" && <AdminCars />}

        {/* RESERVATIONS */}
        {activePage === "reservations" && <AdminReservations />}

        {/* MESSAGES */}
        {activePage === "messages" && <AdminMessages />}

        {/* CLIENTS */}
        {activePage === "clients" && <AdminClients />}

      </main>

    </div>
  );
}

export default AdminDashboard;
