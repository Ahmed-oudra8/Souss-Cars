import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState("client");
  const [isRegister, setIsRegister] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      let response;

      if (role === "admin") {
        response = await api.post("/admin/login", {
          email: form.email,
          password: form.password,
        });
      } else if (isRegister) {
        response = await api.post("/register", form);
      } else {
        response = await api.post("/login", {
          email: form.email,
          password: form.password,
        });
      }

      const data = response.data;

      // SAVE AUTHENTICATION
      localStorage.setItem("souss_token", data.token);
      localStorage.setItem("souss_role", role);

      const user = role === "admin" ? data.admin : data.user;

      localStorage.setItem("souss_user", JSON.stringify(user));

      // REDIRECTION ADMIN
      if (role === "admin") {
        navigate("/admin/dashboard");
        return;
      }

      // REDIRECTION CLIENT
      const requestedPage = location.state?.from;

      if (requestedPage) {
        navigate(requestedPage);
      } else {
        navigate("/client/dashboard");
      }

    } catch (err) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        setError(Object.values(errors).flat().join(" "));
      } else {
        setError(
          err.response?.data?.message ||
          "Une erreur est survenue. Réessayez."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-header">
          <h1>SOUSS <span>CARS</span></h1>
          <p>Bienvenue sur votre espace</p>
        </div>

        <div className="login-tabs">

          <button
            type="button"
            className={role === "client" ? "active" : ""}
            onClick={() => {
              setRole("client");
              setIsRegister(false);
              setError("");
            }}
          >
            Client
          </button>

          <button
            type="button"
            className={role === "admin" ? "active" : ""}
            onClick={() => {
              setRole("admin");
              setIsRegister(false);
              setError("");
            }}
          >
            Administrateur
          </button>

        </div>

        <h2>
          {role === "admin"
            ? "Connexion Admin"
            : isRegister
            ? "Créer un compte"
            : "Connexion Client"}
        </h2>

        <p className="login-description">
          {role === "admin"
            ? "Accédez à votre espace de gestion."
            : "Connectez-vous pour réserver votre voiture."}
        </p>

        <form onSubmit={handleSubmit}>

          {role === "client" && isRegister && (
            <div className="form-group">
              <label>Nom complet</label>
              <input
                type="text"
                name="name"
                placeholder="Votre nom"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>Adresse email</label>
            <input
              type="email"
              name="email"
              placeholder="exemple@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={form.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>

          {role === "client" && isRegister && (
            <div className="form-group">
              <label>Confirmer le mot de passe</label>
              <input
                type="password"
                name="password_confirmation"
                placeholder="Confirmer le mot de passe"
                value={form.password_confirmation}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading
              ? "Chargement..."
              : isRegister
              ? "Créer mon compte"
              : "Se connecter"}
          </button>

        </form>

        {role === "client" && (
          <div className="login-switch">
            {isRegister
              ? "Vous avez déjà un compte ? "
              : "Vous n'avez pas de compte ? "}

            <button
              type="button"
              onClick={() => {
                setIsRegister(!isRegister);
                setError("");
              }}
            >
              {isRegister ? "Se connecter" : "Créer un compte"}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;