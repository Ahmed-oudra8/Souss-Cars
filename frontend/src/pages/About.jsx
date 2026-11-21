
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCarSide,
  faShieldHalved,
  faStar,
  faHeadset,
  faCheck,
  faArrowRight,
  faLocationDot
} from "@fortawesome/free-solid-svg-icons";

import "./About.css";

function About() {
  const services = [
    {
      icon: faCarSide,
      title: "Voitures de qualité",
      description: "Une sélection de véhicules adaptés à tous vos besoins."
    },
    {
      icon: faShieldHalved,
      title: "Sécurité garantie",
      description: "Des véhicules entretenus pour voyager en toute tranquillité."
    },
    {
      icon: faStar,
      title: "Service de qualité",
      description: "Nous mettons votre satisfaction au cœur de nos priorités."
    },
    {
      icon: faHeadset,
      title: "Assistance client",
      description: "Une équipe disponible pour vous accompagner."
    }
  ];

  return (
    <main className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="about-label">À PROPOS DE NOUS</span>

          <h1>
            Découvrez <span>SOUSS CARS</span>
          </h1>

          <p>
            Votre partenaire de confiance pour découvrir Agadir
            et profiter d'une expérience de location simple,
            confortable et accessible.
          </p>

          <Link to="/cars" className="about-hero-btn">
            Découvrir nos voitures
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
      </section>

      {/* PRESENTATION */}
      <section className="about-intro">

        <div className="about-intro-image">
          <img
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=900"
            alt="Voyage en voiture"
          />

          <div className="about-image-badge">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Agadir, Maroc</span>
          </div>
        </div>

        <div className="about-intro-content">

          <span className="about-label">QUI SOMMES-NOUS ?</span>

          <h2>
            Votre voyage commence
            <span> avec nous</span>
          </h2>

          <p>
            SOUSS CARS est une plateforme dédiée à la location
            de voitures à Agadir et dans la région Souss-Massa.
          </p>

          <p>
            Notre objectif est de faciliter vos déplacements
            en vous proposant des véhicules adaptés à vos besoins,
            avec un processus de réservation simple et pratique.
          </p>

          <ul>
            <li>
              <FontAwesomeIcon icon={faCheck} />
              Large choix de véhicules
            </li>

            <li>
              <FontAwesomeIcon icon={faCheck} />
              Réservation simple et rapide
            </li>

            <li>
              <FontAwesomeIcon icon={faCheck} />
              Accompagnement client
            </li>
          </ul>

          <Link to="/cars" className="about-text-btn">
            Explorer nos voitures
            <FontAwesomeIcon icon={faArrowRight} />
          </Link>

        </div>
      </section>

      {/* SERVICES */}
      <section className="about-services">

        <div className="about-section-heading">
          <span className="about-label">NOS ENGAGEMENTS</span>

          <h2>Pourquoi choisir SOUSS CARS ?</h2>

          <p>
            Nous souhaitons rendre chaque déplacement
            plus agréable et plus simple.
          </p>
        </div>

        <div className="about-services-grid">

          {services.map((service, index) => (
            <div className="about-service-card" key={index}>

              <div className="about-service-icon">
                <FontAwesomeIcon icon={service.icon} />
              </div>

              <h3>{service.title}</h3>

              <p>{service.description}</p>

            </div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">

        <h2>Prêt à découvrir Agadir ?</h2>

        <p>
          Choisissez votre voiture et préparez votre prochain voyage.
        </p>

        <Link to="/cars" className="about-cta-btn">
          Voir nos voitures
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>

      </section>

    </main>
  );
}

export default About;
