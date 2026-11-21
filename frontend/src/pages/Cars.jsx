import { useState, useEffect } from "react";
import CarCard from "../components/CarCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../services/api";

import {
  faMagnifyingGlass,
  faSliders
} from "@fortawesome/free-solid-svg-icons";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Toutes");
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sort, setSort] = useState("default");

  // ========================================
  // RÉCUPÉRER LES VOITURES DEPUIS LARAVEL
  // ========================================

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/cars");

        const formattedCars = response.data.data.map((car) => ({
          ...car,
          image: car.image || null,
          price: Number(car.price_per_day),
        }));

        setCars(formattedCars);

      } catch (err) {
        console.error("Erreur API:", err);

        setError(
          "Impossible de charger les voitures. Vérifiez la connexion au serveur."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // ========================================
  // RECHERCHE ET FILTRAGE
  // ========================================

  let filteredCars = cars.filter((car) => {
    const matchesName = car.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "Toutes" || car.category === category;

    const matchesPrice = car.price <= maxPrice;

    return matchesName && matchesCategory && matchesPrice;
  });

  // ========================================
  // TRI DES PRIX
  // ========================================

  if (sort === "ascending") {
    filteredCars.sort((a, b) => a.price - b.price);
  }

  if (sort === "descending") {
    filteredCars.sort((a, b) => b.price - a.price);
  }

  // ========================================
  // AFFICHAGE
  // ========================================

  return (
    <main className="cars-page">

      {/* HEADER */}

      <div className="cars-page-header">
        <span>SOUSS CARS</span>

        <h1>Découvrez nos voitures</h1>

        <p>
          Trouvez la voiture idéale pour vos déplacements à Agadir.
        </p>
      </div>

      <section className="cars-catalog">

        {/* FILTRES */}

        <div className="filters-header">

          <h2>
            <FontAwesomeIcon icon={faSliders} />
            Filtrer les voitures
          </h2>

          <span>
            {loading
              ? "Chargement..."
              : `${filteredCars.length} voitures trouvées`}
          </span>

        </div>

        <div className="filters-box">

          {/* RECHERCHE */}

          <div className="filter-group search-filter">

            <label>Rechercher une voiture</label>

            <div className="input-with-icon">

              <FontAwesomeIcon icon={faMagnifyingGlass} />

              <input
                type="text"
                placeholder="Ex: Dacia Logan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

          </div>

          {/* CATÉGORIE */}

          <div className="filter-group">

            <label>Catégorie</label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Toutes">Toutes les catégories</option>
              <option value="Économique">Économique</option>
              <option value="Citadine">Citadine</option>
              <option value="Berline">Berline</option>
              <option value="Familiale">Familiale</option>
              <option value="SUV">SUV</option>
            </select>

          </div>

          {/* PRIX MAXIMUM */}

          <div className="filter-group">

            <label>
              Prix maximum : {maxPrice} DH / jour
            </label>

            <input
              type="range"
              min="200"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

          </div>

          {/* TRI */}

          <div className="filter-group">

            <label>Trier par prix</label>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Par défaut</option>
              <option value="ascending">Prix croissant</option>
              <option value="descending">Prix décroissant</option>
            </select>

          </div>

        </div>

        {/* LISTE DES VOITURES */}

        <div className="cars-grid catalog-grid">

          {loading ? (

            <div className="no-cars">
              <h3>Chargement des voitures...</h3>
              <p>Veuillez patienter.</p>
            </div>

          ) : error ? (

            <div className="no-cars">
              <h3>Erreur de connexion</h3>
              <p>{error}</p>
            </div>

          ) : filteredCars.length > 0 ? (

            filteredCars.map((car) => (

              <CarCard
                key={car.id}
                id={car.id}
                image={car.image}
                name={car.name}
                category={car.category}
                price={car.price}
                transmission={car.transmission}
                fuel={car.fuel}
                seats={car.seats}
              />

            ))

          ) : (

            <div className="no-cars">
              <h3>Aucune voiture trouvée</h3>

              <p>
                Essayez de modifier vos critères de recherche.
              </p>
            </div>

          )}

        </div>

      </section>

    </main>
  );
}

export default Cars;