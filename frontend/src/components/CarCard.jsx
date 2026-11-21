import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faGasPump,
  faGear,
  faSnowflake,
  faArrowRight,
  faCalendarCheck
} from "@fortawesome/free-solid-svg-icons";

function CarCard({
  id,
  image,
  name,
  category,
  price,
  transmission,
  fuel,
  seats
}) {

  const imageUrl = image
    ? image.startsWith("http")
      ? image
      : `http://127.0.0.1:8000/storage/${image}`
    : null;

  return (
    <div className="car-card">

      <div className="car-image">

        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="car-image-placeholder"
          style={{ display: imageUrl ? "none" : "flex" }}
        >
          <span>{name}</span>
          <small>Photo non disponible</small>
        </div>

        <span className="car-category">
          {category}
        </span>

      </div>

      <div className="car-info">

        <h3>{name}</h3>

        <div className="car-details">

          <span>
            <FontAwesomeIcon icon={faUsers} />
            {seats} places
          </span>

          <span>
            <FontAwesomeIcon icon={faGear} />
            {transmission}
          </span>

          <span>
            <FontAwesomeIcon icon={faGasPump} />
            {fuel}
          </span>

          <span>
            <FontAwesomeIcon icon={faSnowflake} />
            Climatisation
          </span>

        </div>

        <div className="car-bottom">

          <p>
            <strong>{price} DH</strong>
            <small> / jour</small>
          </p>

          <div className="car-actions">

            <Link to={`/cars/${id}`} className="car-btn">
              Détails
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>

            <Link
              to={`/reservation?car=${id}`}
              className="car-reserve-btn"
            >
              <FontAwesomeIcon icon={faCalendarCheck} />
              Réserver
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default CarCard;