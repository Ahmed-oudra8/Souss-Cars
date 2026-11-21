
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faClock,
  faPaperPlane
} from "@fortawesome/free-solid-svg-icons";

import api from "../services/api";
import "./Contact.css";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const response = await api.post("/contact", form);

      setSuccess(
        response.data.message || "Votre message a été envoyé avec succès."
      );

      setForm({
        name: "",
        email: "",
        subject: "",
        message: ""
      });

    } catch (err) {
      console.error("Erreur contact:", err);

      if (err.response?.status === 422) {
        setError("Veuillez vérifier les informations saisies.");
      } else {
        setError("Impossible d'envoyer votre message. Réessayez.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">

      <section className="contact-hero">
        <span>NOUS CONTACTER</span>

        <h1>Parlons de votre prochain voyage</h1>

        <p>
          Une question concernant nos voitures ou nos services ?
          Notre équipe est là pour vous accompagner.
        </p>
      </section>

      <section className="contact-section">

        <div className="contact-info">

          <span className="contact-label">RESTONS EN CONTACT</span>

          <h2>Nous sommes à votre écoute</h2>

          <p className="contact-description">
            N'hésitez pas à nous contacter pour toute information
            concernant la location de voitures à Agadir.
          </p>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>

            <div>
              <h3>Notre adresse</h3>
              <p>Agadir, Maroc</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faPhone} />
            </div>

            <div>
              <h3>Téléphone</h3>
              <p>+212 6XX XXX XXX</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <div>
              <h3>Email</h3>
              <p>contact@sousscars.ma</p>
            </div>
          </div>

          <div className="contact-info-item">
            <div className="contact-icon">
              <FontAwesomeIcon icon={faClock} />
            </div>

            <div>
              <h3>Disponibilité</h3>
              <p>Contactez-nous pour connaître nos horaires.</p>
            </div>
          </div>

        </div>

        <div className="contact-form-container">

          <h2>Envoyez-nous un message</h2>

          <p>
            Remplissez le formulaire ci-dessous.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="contact-input-group">
              <label>Nom complet</label>

              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Adresse email</label>

              <input
                type="email"
                name="email"
                placeholder="exemple@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Sujet</label>

              <input
                type="text"
                name="subject"
                placeholder="Sujet de votre message"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="contact-input-group">
              <label>Votre message</label>

              <textarea
                name="message"
                rows="5"
                placeholder="Écrivez votre message ici..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>

            {error && (
              <p className="contact-error">{error}</p>
            )}

            {success && (
              <p className="contact-success">{success}</p>
            )}

            <button
              type="submit"
              className="contact-submit-btn"
              disabled={loading}
            >
              <FontAwesomeIcon icon={faPaperPlane} />

              {loading ? "Envoi en cours..." : "Envoyer le message"}
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}

export default Contact;
