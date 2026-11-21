import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCarSide,
  faCar,
  faVanShuttle,
  faTruck
} from "@fortawesome/free-solid-svg-icons";

const categories = [
  {
    name: "Économique",
    description: "Des voitures pratiques et économiques.",
    icon: faCarSide
  },
  {
    name: "Citadine",
    description: "Idéale pour circuler dans Agadir.",
    icon: faCar
  },
  {
    name: "Berline",
    description: "Confort et élégance pour vos trajets.",
    icon: faVanShuttle
  },
  {
    name: "SUV",
    description: "Espace et confort pour vos voyages.",
    icon: faTruck
  }
];

function Categories() {
  return (
    <section className="categories-section">

      <div className="section-heading">
        <span>NOS CATÉGORIES</span>
        <h2>Choisissez votre catégorie</h2>
        <p>
          Trouvez la voiture qui correspond à vos besoins
          et profitez de vos déplacements à Agadir.
        </p>
      </div>

      <div className="categories-grid">
        {categories.map((category) => (
          <div className="category-card" key={category.name}>

            <div className="category-icon">
              <FontAwesomeIcon icon={category.icon} />
            </div>

            <h3>{category.name}</h3>

            <p>{category.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default Categories;