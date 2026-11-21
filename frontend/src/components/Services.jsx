import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCarSide,
  faWallet,
  faHeadset,
  faKey
} from "@fortawesome/free-solid-svg-icons";

const services = [
  {
    icon: faCarSide,
    title: "Large choix de voitures",
    description:
      "Une sélection de véhicules adaptés à vos besoins et à votre budget."
  },
  {
    icon: faWallet,
    title: "Prix accessibles",
    description:
      "Des tarifs compétitifs et transparents pour votre location."
  },
  {
    icon: faHeadset,
    title: "Assistance client",
    description:
      "Une équipe disponible pour répondre à vos questions."
  },
  {
    icon: faKey,
    title: "Réservation simple",
    description:
      "Réservez votre voiture facilement et préparez votre voyage."
  }
];

function Services() {
  return (
    <section className="services-section">

      <div className="section-heading">
        <span>POURQUOI NOUS CHOISIR ?</span>

        <h2>Nos services</h2>

        <p>
          Avec SOUSS CARS, profitez d'une expérience
          de location simple et confortable à Agadir.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>

            <div className="service-icon">
              <FontAwesomeIcon icon={service.icon} />
            </div>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Services;