import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">
          Bienvenue chez SOUSS CARS
        </span>

        <h1>
          Découvrez Agadir
          <br />
          en toute liberté
        </h1>

        <p>
          Louez votre voiture à Agadir facilement.
          Profitez d'un service simple, confortable
          et adapté à vos déplacements.
        </p>

        <Link to="/cars" className="hero-btn">
          Découvrir nos voitures
        </Link>
      </div>
    </section>
  );
}

export default Hero;