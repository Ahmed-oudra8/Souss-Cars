
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CarCard from "../components/CarCard";
import Categories from "../components/Categories";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import FAQ from "../components/FAQ";

import api from "../services/api";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await api.get("/cars");

        const carsData = response.data.data || response.data;

        const formattedCars = carsData.map((car) => ({
          id: car.id,
          name: car.name,
          category: car.category,
          price: Number(car.price_per_day),
          seats: car.seats,
          transmission: car.transmission,
          fuel: car.fuel,
          image: car.image,
        }));

        setCars(formattedCars);

      } catch (err) {
        console.error("Erreur chargement voitures:", err);
        setError("Impossible de charger les voitures.");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  return (
    <>
      <Hero />

      <SearchBar />

      <section className="cars-section">

        <div className="section-heading">
          <span>NOTRE FLOTTE</span>

          <h2>Nos voitures disponibles à Agadir</h2>

          <p>
            Découvrez notre sélection de voitures à louer
            pour vos déplacements à Agadir et dans la région Souss-Massa.
          </p>
        </div>

        {loading ? (
          <p>Chargement des voitures...</p>

        ) : error ? (
          <p>{error}</p>

        ) : cars.length > 0 ? (
          <div className="cars-grid">
            {cars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>

        ) : (
          <p>Aucune voiture disponible pour le moment.</p>
        )}

      </section>

      <Categories />

      <Services />

      <Testimonials />

      <FAQ />
    </>
  );
}

export default Home;
