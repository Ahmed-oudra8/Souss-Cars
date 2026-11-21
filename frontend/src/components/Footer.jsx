import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faEnvelope,
  faCarSide,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";

import logo from "../assets/logocars.png";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* BRAND */}
        <div className="footer-brand">

          <img src={logo} alt="SOUSS CARS Logo" />

          <h3>SOUSS CARS</h3>

          <p>
            Votre partenaire de confiance pour la location
            de voitures à Agadir et dans la région Souss-Massa.
          </p>

        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">

          <h3>Liens rapides</h3>

          <Link to="/">Accueil</Link>
          <Link to="/cars">Nos voitures</Link>
          <Link to="/about">À propos</Link>
          <Link to="/contact">Contact</Link>

        </div>

        {/* SERVICES */}
        <div className="footer-column">

          <h3>Nos services</h3>

          <Link to="/cars">Location de voitures</Link>
          <Link to="/cars">Voitures économiques</Link>
          <Link to="/cars">Voitures familiales</Link>
          <Link to="/contact">Assistance client</Link>

        </div>

        {/* CONTACT */}
        <div className="footer-column footer-contact">

          <h3>Contactez-nous</h3>

          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            Agadir, Maroc
          </p>

          <p>
            <FontAwesomeIcon icon={faPhone} />
            +212 6XX XXX XXX
          </p>

          <p>
            <FontAwesomeIcon icon={faEnvelope} />
            contact@sousscars.ma
          </p>

        </div>

      </div>

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} SOUSS CARS.
          Tous droits réservés.
        </p>

        <span>
          <FontAwesomeIcon icon={faCarSide} />
          Location de voitures à Agadir
        </span>

      </div>

    </footer>
  );
}

export default Footer;