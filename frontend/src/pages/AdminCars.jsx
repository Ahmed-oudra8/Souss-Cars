
import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminCars.css";

const emptyForm = {
  name: "",
  category: "Économique",
  description: "",
  price_per_day: "",
  seats: 5,
  transmission: "Manuelle",
  fuel: "Diesel",
  is_available: true,
};

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Construire l'URL de l'image
  const imageUrl = (path) => {
    if (!path) return "";

    if (path.startsWith("http")) {
      return path;
    }

    return `http://127.0.0.1:8000/storage/${path}`;
  };

  // Charger les voitures
  const fetchCars = async () => {
    try {
      setLoading(true);

      const response = await api.get("/cars");

      setCars(response.data.data || []);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les voitures.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  // Modifier les champs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Choisir une image
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setError("");

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setError("Veuillez choisir une image JPG, PNG ou WEBP.");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("L'image ne doit pas dépasser 5 Mo.");
      e.target.value = "";
      return;
    }

    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingId(null);
    setMessage("");
    setError("");

    const input = document.getElementById("car-image");

    if (input) {
      input.value = "";
    }
  };

  // Ajouter ou modifier une voiture
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setSaving(true);

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "is_available") {
          formData.append(key, value ? "1" : "0");
        } else {
          formData.append(key, String(value ?? ""));
        }
      });

      if (image instanceof File) {
        formData.append("image", image, image.name);
      }

      if (editingId) {
        await api.post(`/admin/cars/${editingId}`, formData);

        setMessage("Voiture modifiée avec succès !");
      } else {
        await api.post("/admin/cars", formData);

        setMessage("Voiture ajoutée avec succès !");
      }

      if (imagePreview.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreview);
      }

      setForm(emptyForm);
      setImage(null);
      setImagePreview("");
      setEditingId(null);

      const input = document.getElementById("car-image");

      if (input) input.value = "";

      await fetchCars();

    } catch (err) {
      console.error("Erreur enregistrement :", err);

      const validationErrors = err.response?.data?.errors;

      if (validationErrors) {
        setError(
          Object.values(validationErrors).flat().join(" ")
        );
      } else {
        setError(
          err.response?.data?.message ||
          "Une erreur est survenue."
        );
      }
    } finally {
      setSaving(false);
    }
  };

  // Préparer la modification
  const handleEdit = (car) => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }

    setEditingId(car.id);

    setForm({
      name: car.name || "",
      category: car.category || "Économique",
      description: car.description || "",
      price_per_day: car.price_per_day || "",
      seats: car.seats || 5,
      transmission: car.transmission || "Manuelle",
      fuel: car.fuel || "Diesel",
      is_available: Boolean(car.is_available),
    });

    setImage(null);

    setImagePreview(
      car.image ? imageUrl(car.image) : ""
    );

    setMessage("");
    setError("");

    const input = document.getElementById("car-image");

    if (input) input.value = "";

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Supprimer une voiture
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette voiture ?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/admin/cars/${id}`);

      setMessage("Voiture supprimée avec succès !");

      if (editingId === id) {
        resetForm();
      }

      await fetchCars();

    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Impossible de supprimer cette voiture."
      );
    }
  };

  return (
    <main className="admin-page">

      {/* HEADER */}
      <div className="admin-header">
        <span>SOUSS CARS</span>

        <h1>Administration des voitures</h1>

        <p>
          Gérez votre flotte de véhicules facilement.
        </p>
      </div>

      <div className="admin-container">

        {/* FORMULAIRE */}
        <section className="admin-form-section">

          <h2>
            {editingId
              ? "Modifier une voiture"
              : "Ajouter une voiture"}
          </h2>

          {message && (
            <div className="admin-success">
              {message}
            </div>
          )}

          {error && (
            <div className="admin-error">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="admin-form"
          >

            <div className="admin-fields">

              {/* Nom */}
              <div className="admin-field">
                <label>Nom de la voiture</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Ex: Dacia Logan"
                  required
                />
              </div>

              {/* Catégorie */}
              <div className="admin-field">
                <label>Catégorie</label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                >
                  <option>Économique</option>
                  <option>Citadine</option>
                  <option>Berline</option>
                  <option>Familiale</option>
                  <option>SUV</option>
                </select>
              </div>

              {/* Prix */}
              <div className="admin-field">
                <label>Prix par jour (DH)</label>

                <input
                  type="number"
                  name="price_per_day"
                  value={form.price_per_day}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              {/* Places */}
              <div className="admin-field">
                <label>Nombre de places</label>

                <input
                  type="number"
                  name="seats"
                  value={form.seats}
                  onChange={handleChange}
                  min="1"
                  required
                />
              </div>

              {/* Transmission */}
              <div className="admin-field">
                <label>Transmission</label>

                <select
                  name="transmission"
                  value={form.transmission}
                  onChange={handleChange}
                >
                  <option>Manuelle</option>
                  <option>Automatique</option>
                </select>
              </div>

              {/* Carburant */}
              <div className="admin-field">
                <label>Carburant</label>

                <select
                  name="fuel"
                  value={form.fuel}
                  onChange={handleChange}
                >
                  <option>Diesel</option>
                  <option>Essence</option>
                  <option>Hybride</option>
                  <option>Électrique</option>
                </select>
              </div>

            </div>

            {/* Description */}
            <div className="admin-field">
              <label>Description</label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="3"
              />
            </div>

            {/* IMAGE */}
            <div className="admin-field">

              <label>Photo de la voiture</label>

              <input
                id="car-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImage}
              />

              <small>
                Formats JPG, PNG ou WEBP — maximum 5 Mo.
              </small>

              {/* Aperçu de l'image */}
              {imagePreview && (
                <div className="admin-image-preview">

                  <span>Aperçu de la photo</span>

                  <img
                    src={imagePreview}
                    alt="Aperçu de la voiture"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />

                </div>
              )}

            </div>

            {/* Disponibilité */}
            {editingId && (
              <label className="admin-checkbox">

                <input
                  type="checkbox"
                  name="is_available"
                  checked={form.is_available}
                  onChange={handleChange}
                />

                Voiture disponible

              </label>
            )}

            {/* BOUTONS */}
            <div className="admin-buttons">

              <button
                type="submit"
                className="admin-submit"
                disabled={saving}
              >
                {saving
                  ? "Enregistrement..."
                  : editingId
                    ? "Enregistrer les modifications"
                    : "Ajouter la voiture"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="admin-cancel"
                  onClick={resetForm}
                >
                  Annuler
                </button>
              )}

            </div>

          </form>

        </section>

        {/* LISTE DES VOITURES */}
        <section className="admin-list-section">

          <div className="admin-list-header">

            <h2>Liste des voitures</h2>

            <span>
              {cars.length} voitures
            </span>

          </div>

          {loading ? (

            <p>Chargement...</p>

          ) : (

            <div className="admin-table-wrapper">

              <table className="admin-table">

                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Voiture</th>
                    <th>Catégorie</th>
                    <th>Prix / jour</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>

                  {cars.map((car) => (

                    <tr key={car.id}>

                      {/* PHOTO */}
                      <td>

                        {car.image ? (

                          <img
                            src={imageUrl(car.image)}
                            alt={car.name}
                            className="admin-car-image"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />

                        ) : (

                          <div className="admin-no-image">
                            Sans photo
                          </div>

                        )}

                      </td>

                      <td>{car.name}</td>

                      <td>{car.category}</td>

                      <td>
                        {car.price_per_day} DH
                      </td>

                      {/* ACTIONS */}
                      <td>

                        <div className="admin-actions">

                          <button
                            type="button"
                            onClick={() => handleEdit(car)}
                            className="admin-edit"
                          >
                            Modifier
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(car.id)}
                            className="admin-delete"
                          >
                            Supprimer
                          </button>

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

              {cars.length === 0 && (
                <p className="admin-empty">
                  Aucune voiture enregistrée.
                </p>
              )}

            </div>

          )}

        </section>

      </div>

    </main>
  );
}

export default AdminCars;
