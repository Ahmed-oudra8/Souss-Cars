import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faCalendarDays,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  return (
    <section className="search-section">
      <div className="search-box">

        <div className="search-field">
          <FontAwesomeIcon icon={faLocationDot} />
          <div>
            <label>Lieu de prise en charge</label>
            <select>
              <option>Agadir</option>
              <option>Aéroport Agadir</option>
              <option>Taghazout</option>
              <option>Taroudant</option>
            </select>
          </div>
        </div>

        <div className="search-field">
          <FontAwesomeIcon icon={faCalendarDays} />
          <div>
            <label>Date de départ</label>
            <input type="date" />
          </div>
        </div>

        <div className="search-field">
          <FontAwesomeIcon icon={faCalendarDays} />
          <div>
            <label>Date de retour</label>
            <input type="date" />
          </div>
        </div>

        <button className="search-btn">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
          Rechercher
        </button>

      </div>
    </section>
  );
}

export default SearchBar;