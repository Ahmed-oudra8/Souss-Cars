import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faQuoteRight } from "@fortawesome/free-solid-svg-icons";

const testimonials = [
  {
    name: "Youssef A.",
    location: "Agadir",
    text: "Une expérience de location simple et agréable. Le service était professionnel.",
    rating: 5
  },
  {
    name: "Sara M.",
    location: "Casablanca",
    text: "Une bonne expérience pour découvrir Agadir et ses environs en voiture.",
    rating: 5
  },
  {
    name: "Amine B.",
    location: "Marrakech",
    text: "Un choix de voitures intéressant et une réservation facile.",
    rating: 4
  }
];

function Testimonials() {
  return (
    <section className="testimonials-section">

      <div className="section-heading">
        <span>AVIS CLIENTS</span>

        <h2>Ce que nos clients pensent</h2>

        <p>
          La satisfaction de nos clients est au cœur
          de notre service.
        </p>
      </div>

      <div className="testimonials-grid">

        {testimonials.map((item, index) => (
          <div className="testimonial-card" key={index}>

            <FontAwesomeIcon
              icon={faQuoteRight}
              className="quote-icon"
            />

            <div className="stars">
              {[...Array(item.rating)].map((_, i) => (
                <FontAwesomeIcon icon={faStar} key={i} />
              ))}
            </div>

            <p className="testimonial-text">
              "{item.text}"
            </p>

            <div className="client-info">
              <div className="client-avatar">
                {item.name.charAt(0)}
              </div>

              <div>
                <h4>{item.name}</h4>
                <span>{item.location}</span>
              </div>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Testimonials;