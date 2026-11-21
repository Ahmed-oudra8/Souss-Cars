import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import api from "../services/api";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCalendarDays,
  faLocationDot,
  faUser,
  faPhone
} from "@fortawesome/free-solid-svg-icons";

function Reservation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const carId = searchParams.get("car");

  const [selectedCar, setSelectedCar] = useState(null);
  const [loadingCar, setLoadingCar] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    startDate: "",
    endDate: "",
    location: "Agadir"
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // CLIENT AUTHENTICATION
  useEffect(() => {
    const token = localStorage.getItem("souss_token");
    const role = localStorage.getItem("souss_role");

    if (!token || role !== "client") {
      navigate("/login", {
        state: {
          from: `/reservation?car=${carId}`
        }
      });
    }
  }, [navigate, carId]);

  // GET CLIENT INFORMATION
  useEffect(() => {
    const savedUser = localStorage.getItem("souss_user");

    if (savedUser) {
      const user = JSON.parse(savedUser);

      setForm((prev) => ({
        ...prev,
        name: user.name || ""
      }));
    }
  }, []);

  // GET CAR FROM DATABASE
  useEffect(() => {
    const fetchCar = async () => {
      if (!carId) {
        setLoadingCar(false);
        return;
      }

      try {
        const response = await api.get(`/cars/${carId}`);

        const car = response.data.data || response.data;

        const image = car.image
          ? car.image.startsWith("http")
            ? car.image
            : `http://127.0.0.1:8000/storage/${car.image}`
          : null;

        setSelectedCar({
          ...car,
          image,
          price: Number(car.price_per_day)
        });

      } catch (error) {
        console.error("Erreur voiture:", error);
        setSelectedCar(null);
      } finally {
        setLoadingCar(false);
      }
    };

    fetchCar();
  }, [carId]);

  // HANDLE FORM
  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  // SUBMIT RESERVATION
  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setSuccess(false);

    const token = localStorage.getItem("souss_token");
    const role = localStorage.getItem("souss_role");

    if (!token || role !== "client") {
      navigate("/login", {
        state: {
          from: `/reservation?car=${carId}`
        }
      });
      return;
    }

    if (!selectedCar) {
      setMessage("Veuillez sélectionner une voiture.");
      return;
    }

    if (form.endDate <= form.startDate) {
      setMessage(
        "La date de retour doit être après la date de départ."
      );
      return;
    }

    const reservationData = {
      car_id: Number(carId),
      customer_name: form.name,
      phone: form.phone,
      pickup_location: form.location,
      start_date: form.startDate,
      end_date: form.endDate
    };

    try {
      setLoading(true);

      const response = await api.post(
        "/reservations",
        reservationData
      );

      setSuccess(true);

      setMessage(
        response.data.message ||
        "Votre réservation a été enregistrée avec succès !"
      );

    } catch (error) {
      console.error("Erreur réservation:", error);

      if (error.response?.status === 401) {
        navigate("/login", {
          state: {
            from: `/reservation?car=${carId}`
          }
        });

      } else if (error.response?.status === 409) {
        setMessage(
          error.response.data.message ||
          "Cette voiture n'est pas disponible."
        );

      } else if (error.response?.status === 422) {
        setMessage(
          error.response.data.message ||
          "Veuillez vérifier les informations saisies."
        );

      } else {
        setMessage(
          "Une erreur est survenue. Veuillez réessayer."
        );
      }

    } finally {
      setLoading(false);
    }
  }

  // CALCUL PRICE
  const days =
    form.startDate &&
    form.endDate &&
    form.endDate > form.startDate
      ? Math.ceil(
          (
            new Date(form.endDate + "T00:00:00") -
            new Date(form.startDate + "T00:00:00")
          ) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const totalPrice = selectedCar
    ? days * selectedCar.price
    : 0;

  // LOADING
  if (loadingCar) {
    return (
      <div className="reservation-error">
        Chargement de la voiture...
      </div>
    );
  }

  // CAR NOT FOUND
  if (!selectedCar) {
    return (
      <div className="reservation-error">
        <h2>Aucune voiture sélectionnée</h2>
        <Link to="/cars">
          Découvrir nos voitures
        </Link>
      </div>
    );
  }

  return (
    <main className="reservation-page">

      {/* HEADER */}
      <div className="reservation-header">
        <span>SOUSS CARS</span>

        <h1>Réservez votre voiture</h1>

        <p>
          Préparez votre prochain déplacement à Agadir.
        </p>
      </div>

      <div className="reservation-container">

        {/* RESERVATION FORM */}
        <form
          className="reservation-form"
          onSubmit={handleSubmit}
        >

          <h2>Informations personnelles</h2>

          {/* NAME */}
          <div className="reservation-field">
            <label>Nom complet</label>

            <div className="reservation-input">
              <FontAwesomeIcon icon={faUser} />

              <input
                type="text"
                name="name"
                placeholder="Votre nom complet"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* PHONE */}
          <div className="reservation-field">
            <label>Numéro de téléphone</label>

            <div className="reservation-input">
              <FontAwesomeIcon icon={faPhone} />

              <input
                type="tel"
                name="phone"
                placeholder="Votre numéro de téléphone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <h2>Informations de réservation</h2>

          {/* LOCATION */}
          <div className="reservation-field">
            <label>Lieu de récupération</label>

            <div className="reservation-input">
              <FontAwesomeIcon icon={faLocationDot} />

              <select
                name="location"
                value={form.location}
                onChange={handleChange}
              >
                <option value="Agadir">Agadir</option>

                <option value="Aéroport Agadir">
                  Aéroport Agadir
                </option>

                <option value="Taghazout">
                  Taghazout
                </option>
              </select>
            </div>
          </div>

          {/* DATES */}
          <div className="reservation-dates">

            <div className="reservation-field">
              <label>Date de départ</label>

              <div className="reservation-input">
                <FontAwesomeIcon icon={faCalendarDays} />

                <input
                  type="date"
                  name="startDate"
                  min={new Date().toLocaleDateString("en-CA")}
                  value={form.startDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="reservation-field">
              <label>Date de retour</label>

              <div className="reservation-input">
                <FontAwesomeIcon icon={faCalendarDays} />

                <input
                  type="date"
                  name="endDate"
                  min={
                    form.startDate ||
                    new Date().toLocaleDateString("en-CA")
                  }
                  value={form.endDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

          </div>

          {/* TOTAL */}
          {days > 0 && (
            <div className="reservation-total">
              <p>Durée : {days} jour(s)</p>

              <strong>
                Total estimé : {totalPrice} DH
              </strong>
            </div>
          )}

          {/* MESSAGE */}
          {message && (
            <p
              className="reservation-message"
              style={{
                color: success ? "#287447" : "#b83232"
              }}
            >
              {message}
            </p>
          )}

          {/* SUCCESS BUTTON */}
          {success && (
            <button
              type="button"
              className="reservation-submit"
              onClick={() => navigate("/client/dashboard")}
            >
              Voir mes réservations
            </button>
          )}

          {/* SUBMIT BUTTON */}
          {!success && (
            <button
              type="submit"
              className="reservation-submit"
              disabled={loading}
            >
              {loading
                ? "Enregistrement..."
                : "Confirmer la demande"}
            </button>
          )}

        </form>

        {/* CAR SUMMARY */}
        <div className="reservation-summary">

          <h2>Votre voiture</h2>

          {selectedCar.image && (
            <img
              src={selectedCar.image}
              alt={selectedCar.name}
            />
          )}

          <h3>{selectedCar.name}</h3>

          <span>{selectedCar.category}</span>

          <div className="summary-price">
            {selectedCar.price} DH
            <small> / jour</small>
          </div>

          <p>
            Votre réservation sera confirmée après
            vérification de disponibilité.
          </p>

        </div>

      </div>

    </main>
  );
}

export default Reservation;