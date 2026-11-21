
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faGasPump,
  faGear,
  faSnowflake,
  faArrowLeft,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/cars/${id}`);

        const carData = response.data.data || response.data;

        const baseURL = api.defaults.baseURL.replace(/\/api\/?$/, "");

        setCar({
          ...carData,
          price: Number(carData.price_per_day),
          image: carData.image
            ? carData.image.startsWith("http")
              ? carData.image
              : `${baseURL}/storage/${carData.image}`
            : null
        });

      } catch (err) {
        console.error("Erreur voiture:", err);
        setError("Impossible de charger cette voiture.");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  if (loading) {
    return (
      <div className="car-not-found">
        <h2>Chargement de la voiture...</h2>
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="car-not-found">
        <h2>{error || "Voiture introuvable"}</h2>
        <Link to="/cars">Retour aux voitures</Link>
      </div>
    );
  }

  return (
    <main className="car-details-page">

      <div className="details-container">

        <Link to="/cars" className="back-link">
          <FontAwesomeIcon icon={faArrowLeft} />
          Retour aux voitures
        </Link>

        <div className="details-layout">

          <div className="details-image">
            {car.image ? (
              <img src={car.image} alt={car.name} />
            ) : (
              <div className="car-image-placeholder">
                Photo non disponible
              </div>
            )}
          </div>

          <div className="details-content">

            <span className="details-category">
              {car.category}
            </span>

            <h1>{car.name}</h1>

            <p className="details-description">
              {car.description || "Aucune description disponible."}
            </p>

            <div className="details-specifications">

              <div>
                <FontAwesomeIcon icon={faUsers} />
                <span>{car.seats} places</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faGear} />
                <span>{car.transmission}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faGasPump} />
                <span>{car.fuel}</span>
              </div>

              <div>
                <FontAwesomeIcon icon={faSnowflake} />
                <span>Climatisation</span>
              </div>

            </div>

            <div className="details-price">
              <strong>{car.price} DH</strong>
              <span>/ jour</span>
            </div>

            <Link
              to={`/reservation?car=${car.id}`}
              className="reserve-btn"
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              Demander une réservation
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}

export default CarDetails;
